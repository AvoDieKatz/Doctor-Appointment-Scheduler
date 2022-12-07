<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/admin', name: 'api_admin_')]
class AdminController extends AbstractController
{
    #[Route('/appointment-history', name: 'view_appointment_history')]
    public function viewAppointmentHistory()
    {
        return $this->redirectToRoute('api_appointments_view_all');
    }

    // -----------------------DEPARTMENT MANAGEMENT------------------------------
    #[Route('/create-department', name: 'create_department', methods: 'POST')]
    public function createDepartment(): JsonResponse
    {
        return $this->json([]);
    }

    #[Route('/update-department/{departmentId}', name: 'update_department', methods: 'PUT')]
    public function updateDepartment(): JsonResponse
    {
        return $this->json([]);
    }

    #[Route('/delete-department/{departmentId}', name: 'delete_department', methods: 'DELETE')]
    public function deleteDepartment(): JsonResponse
    {
        return $this->json([]);
    }

    // -------------------------DOCTOR MANAGEMENT-------------------------------
    #[Route('/create-doctor', name: 'create_doctor', methods: 'POST')]
    public function createDoctor(): JsonResponse
    {
        return $this->json([]);
    }

    #[Route('/update-doctor/{doctorId}', name: 'update_doctor', methods: 'PUT')]
    public function updateDoctor($doctorId): JsonResponse
    {
        return $this->json([]);
    }

    #[Route('/delete-doctor/{doctorId}', name: 'delete_doctor', methods: 'DELETE')]
    public function deleteDoctor($doctorId): JsonResponse
    {
        return $this->json([]);
    }

}
