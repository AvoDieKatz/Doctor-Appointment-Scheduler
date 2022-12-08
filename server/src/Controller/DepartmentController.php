<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/department', name: 'api_department_')]
class DepartmentController extends AbstractController
{
    #[Route('/', name: 'view_all')]
    public function viewAllDepartments(): JsonResponse
    {
        return $this->json([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/DepartmentController.php',
        ]);
    }

    #[Route('/{departmentId}', name: 'view_detail')]
    public function viewDepartmentDetail($departmentId): JsonResponse
    {
        $department = $this->repository->find($departmentId);
        return $this->json([$department]);
    }

}
