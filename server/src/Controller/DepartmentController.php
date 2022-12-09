<?php

namespace App\Controller;

use App\Repository\DepartmentRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

#[Route('/api/department', name: 'api_department_')]
class DepartmentController extends AbstractController
{
    #[Route('/', name: 'view_all')]
    //TODO: implement
    public function viewAllDepartments(DepartmentRepository $repository): JsonResponse
    {
        $departments = $repository->findAll();
        //Custom DQL to get id and name of department
        $myDepartments = $repository->listDept();
        $data = [];
        foreach ($departments as $department) {
            $data[] = [
                'id' => $department->getId(),
                'name' => $department->getName(),
                'doctors' => $department->getDoctors()
            ];
        }
        return $this->json(
            $data,
            // $myDepartments,
            Response::HTTP_OK,
            [],
            [
                //Ignore the unwanted attributes
                ObjectNormalizer::IGNORED_ATTRIBUTES => ['userId', 'department', 'appointments'],
                //Handle Circular Reference Exception in Association Relationship
                ObjectNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object) {
                    return $object->getId();
                }
            ]
        );
    }

    #[Route('/{departmentId}', name: 'view_detail')]
    //TODO: implement
    public function viewDepartmentDetail($departmentId): JsonResponse
    {
        return $this->json([]);
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
