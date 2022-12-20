<?php

namespace App\Controller;

use App\Entity\Appointment;
use App\Entity\Report;
use App\Repository\AppointmentRepository;
use App\Repository\ReportRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
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
    public function createReport(AppointmentRepository $appointmentRepository, Request $request): JsonResponse
    {
        $data = $request->toArray();
        $appointment = $appointmentRepository->find($data['appointmentId']);
        if (!$appointment) {
            return $this->json([
                'message' => 'The appointment does not exist to create a report'
            ], Response::HTTP_BAD_REQUEST);
        }

        $report = $this->repository->findOneBy(['appointment' => $data['appointmentId']]);
        if ($report) {
            return $this->json([
                'message' => 'The appointment already have a report'
            ], Response::HTTP_BAD_REQUEST);
        }

        $report = new Report();
        date_default_timezone_set("Asia/Bangkok");
        $report->setAppointmentId($appointment)
            ->setBloodPressure($data['bloodPressure'])
            ->setOxygen($data['oxygen'])
            ->setWeight($data['weight'])
            ->setMessage($data['message'])
            ->setCreatedAt(new \DateTime());
        // Update the isDone status in Appointment
        $appointment->setDone(true);
            
        $this->manager->persist($report);
        $this->manager->flush();
            
        return $this->json(['message' => 'A report is successfully created'], Response::HTTP_CREATED);
    }

    #[Route('/update/{appointmentId}', name: 'update', methods: 'PUT')]
    public function updateReport($appointmentId): JsonResponse
    {
        return $this->json([]);
    }
}
