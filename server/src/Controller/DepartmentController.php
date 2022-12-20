<?php

namespace App\Controller;

use App\Repository\DepartmentRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

#[Route('/api/departments', name: 'api_department_')]
class DepartmentController extends AbstractController
{

    private $repository, $manager;

    public function __construct(DepartmentRepository $departmentRepository, ManagerRegistry $managerRegistry)
    {
        $this->repository = $departmentRepository;
        $this->manager = $managerRegistry->getManager();
    }

    /*
        This route returns all Departments in the system and its id and name
    */
    #[Route('/', name: 'view_all', methods: 'GET')]
    public function viewAllDepartments(): JsonResponse
    {
        // $departments = $this->repository->findAll();
        $departments = $this->repository->findBy(['deleted' => false]);
        $data = [];
        foreach ($departments as $department) {
            $data[] = [
                'id' => $department->getId(),
                'name' => $department->getName(),
            ];
        }
        return $this->json(
            $data,
            Response::HTTP_OK,
            [],
            [
                //Handle Circular Reference Exception in Association Relationship
                ObjectNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object) {
                    return $object->getId();
                }
            ]
        );
    }

    /*
        This route returns department's id, name and doctors of this department
    */
    #[Route('/{departmentId}', name: 'view_detail', methods: 'GET')]
    public function viewDepartmentDetail($departmentId): JsonResponse
    {
        $department = $this->repository->findOneBy(['id' => $departmentId, 'deleted' => false]);
        if (!$department) {
            return $this->json(
                [
                    'message' => 'The requested department does not exist',
                ],
                Response::HTTP_NOT_FOUND
            );
        }
        $data = [
            'id' => $department->getId(),
            'name' => $department->getName(),
            // filter out all of the non-deleted doctors collection
            'doctors' => $department->getDoctors()->filter(function ($e) {
                return $e->isDeleted() === false;
            })
        ];
        return $this->json(
            $data,
            Response::HTTP_OK,
            [],
            [
                //Ignore the unwanted attributes inside associated attributes
                ObjectNormalizer::IGNORED_ATTRIBUTES => ['userId', 'department', 'appointments', 'deleted'],
                ObjectNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object) {
                    return $object->getId();
                }
            ]
        );
    }

    #[Route('/create', name: 'create', methods: 'POST')]
    //TODO: implement
    public function createDepartment(): JsonResponse
    {
        return $this->json([]);
    }

    #[Route('/{departmentId}/update', name: 'update', methods: 'PUT')]
    //TODO: implement
    public function updateDepartment(): JsonResponse
    {
        return $this->json([]);
    }

    #[Route('/{departmentId}/delete', name: 'delete', methods: 'DELETE')]
    //TODO: implement
    public function deleteDepartment(): JsonResponse
    {
        return $this->json([]);
    }
}
