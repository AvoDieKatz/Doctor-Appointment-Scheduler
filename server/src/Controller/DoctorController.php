<?php

namespace App\Controller;

use App\Entity\Doctor;
use App\Entity\User;
use App\Repository\DepartmentRepository;
use App\Repository\DoctorRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

#[Route('/api/doctors', name: 'api_doctor_')]
class DoctorController extends AbstractController
{

    private $repository, $manager;

    public function __construct(DoctorRepository $doctorRepository, ManagerRegistry $managerRegistry)
    {
        $this->repository = $doctorRepository;
        $this->manager = $managerRegistry->getManager();
    }

    #[Route('/', name: 'view_all', methods: 'GET')]
    public function viewAllDoctor(): JsonResponse
    {
        $doctors = $this->repository->findBy(['deleted' => false]);
        $data = [];
        foreach ($doctors as $doctor) {
            $data[] = [
                'id' => $doctor->getId(),
                'departmentId' => $doctor->getDepartment()->getId(),
                'name' => $doctor->getName(),
                'department' => $doctor->getDepartment()->getName()
            ];
        }
        return $this->json(
            $data,
            Response::HTTP_OK,
        );
    }

    #[Route('/{doctorId}', name: 'view_detail', methods: 'GET')]
    public function viewDoctorDetail($doctorId): JsonResponse
    {
        $doctor = $this->repository->findOneBy(['id' => $doctorId, 'deleted' => false]);
        if (!$doctor) {
            return $this->json(
                [
                    'mesage' => 'the requested doctor does not exist',
                ],
                Response::HTTP_NOT_FOUND
            );
        }
        $data = [
            'id' => $doctor->getID(),
            'departmentId' => $doctor->getDepartment()->getId(),
            'name' => $doctor->getName(),
            'department' => $doctor->getDepartment()->getName(),

        ];
        return $this->json(
            $data,
            Response::HTTP_OK,
        );
    }

    #[Route('/create', name: 'create', methods: 'POST')]
    public function createDoctor(
        Request $request,
        DepartmentRepository $departmentRepository,
        UserPasswordHasherInterface $hasher
    ): JsonResponse {

        $data = $request->toArray();
        $user = new User();
        $user->setUsername($data['username'])
            ->setPassword($hasher->hashPassword($user, $data['password']))
            ->setRoles(['ROLE_DOCTOR']);

        $department = $departmentRepository->findOneBy(['id' => $data['departmentId'], 'deleted' => false]);
        if (!$department) {
            return $this->json(
                [
                    "message" => "Department does not exist"
                ],
                Response::HTTP_BAD_REQUEST
            );
        }

        $doctor = new Doctor();
        $doctor->setUserId($user)
            ->setName($data['name'])
            ->setDepartment($department)
            ->setDeleted(false);

        $this->manager->persist($user);
        $this->manager->flush();
        $this->manager->persist($doctor);
        $this->manager->flush();

        return $this->json(
            [
                "message" => "Doctor is susccessfully created"
            ],
            Response::HTTP_CREATED
        );
    }

    #[Route('/{doctorId}', name: 'update', methods: 'PUT')]
    public function updateDoctor(
        $doctorId,
        Request $request,
        DepartmentRepository $departmentRepository
    ): JsonResponse {
        $doctor = $this->repository->findOneBy(['id' => $doctorId, 'deleted' => false]);
        if (!$doctor) {
            return $this->json(
                [
                    'message' => 'Doctor not found'
                ],
                Response::HTTP_BAD_REQUEST
            );
        }

        $data = $request->toArray();

        $department = $departmentRepository->findOneBy(['id' => $data['departmentId'], 'deleted' => false]);
        if (!$department) {
            return $this->json(
                [
                    'message' => 'The department cannot be found'
                ],
                Response::HTTP_BAD_REQUEST
            );
        }

        $doctor->setName($data['name'])
            ->setDepartment($department);

        $this->manager->flush();
        return $this->json(
            [
                'message' => 'The doctor has been updated'
            ],
            Response::HTTP_OK
        );
    }

    #[Route('/{doctorId}', name: 'delete', methods: 'DELETE')]
    public function deleteDoctor($doctorId): JsonResponse
    {
        $doctor = $this->repository->findOneBy(['id' => $doctorId, 'deleted' => false]);
        if (!$doctor) {
            return $this->json(
                [
                    'message' => 'Doctor does not exist'
                ],
                Response::HTTP_BAD_REQUEST
            );
        }
        $doctor->setDeleted(true);
        $this->manager->flush();
        return $this->json(
            [
                'message' => 'The doctor has been removed'
            ],
            Response::HTTP_OK
        );
    }
}
