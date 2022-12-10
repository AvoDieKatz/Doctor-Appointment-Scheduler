<?php

namespace App\Controller;

use App\Entity\Appointment;
use App\Repository\AppointmentRepository;
use App\Repository\ReportRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/reports', name: 'api_report_')]

class ReportController extends AbstractController
{

    private $repository, $manager;

    public function __construct(ReportRepository $reportRepository, ManagerRegistry $managerRegistry)
    {
        $this->repository = $reportRepository;
        $this->manager = $managerRegistry->getManager();
    }

    #[Route('/create', name: 'create', methods: 'POST')]
    public function createReport(): JsonResponse
    {
        return $this->json([]);
    }

    #[Route('/update/{appointmentId}', name: 'update', methods: 'PUT')]
    public function updateReport($appointmentId): JsonResponse
    {
        return $this->json([]);
    }

}
