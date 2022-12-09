<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/doctor', name: 'api_doctor_')]
class DoctorController extends AbstractController
{
    

    #[Route('/create', name: 'create', methods: 'POST')]
    public function createDoctor(): JsonResponse
    {
        return $this->json([]);
    }

    #[Route('/{doctorId}/update', name: 'update', methods: 'PUT')]
    public function updateDoctor($doctorId): JsonResponse
    {
        return $this->json([]);
    }

    #[Route('/delete/{doctorId}', name: 'delete', methods: 'DELETE')]
    public function deleteDoctor($doctorId): JsonResponse
    {
        return $this->json([]);
    }

}
