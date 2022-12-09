<?php

namespace App\Controller;

use App\Entity\Appointment;
use App\Repository\AppointmentRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/report', name: 'api_report_')]

class ReportController extends AbstractController
{

    #[Route('/create', name: 'create', methods: 'POST')]
    public function createReport(): JsonResponse
    {
        return $this->json([
            'message' => 'Check'
        ]);
    }

    #[Route('/update/{appointmentId}', name: 'update', methods: 'PUT')]
    public function updateReport($appointmentId): JsonResponse
    {
        return $this->json([]);
    }

}
