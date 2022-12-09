<?php

namespace App\Controller;

use App\Repository\AppointmentRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/appointments', name: 'api_appointments_')]
class AppointmentController extends AbstractController
{
    private $repository, $manager;

    public function __construct(AppointmentRepository $appointmentRepository, ManagerRegistry $manager)
    {
        $this->repository = $appointmentRepository;
        $this->manager = $manager->getManager();
    }

    #[Route('/', name: 'view_all')]
    //TODO: implement
    public function viewAllAppointments()
    {
        $appointments = $this->repository->findAll();
        $data = [];
        foreach ($appointments as $appointment) {
            $data[] = [
                'id' => $appointment->getId(),
                'patient_name' => $appointment->getPatientName(),
                'patient_gender' => $appointment->getPatientGender(),
                'patient_dob' => $appointment->getPatientDob(),
                'doctor' => $appointment->getDoctor()->getName(),
                'patient_department' => $appointment->getPatientDepartment()->getName(),
                'patient_message' => $appointment->getPatientMessage(),
                'scheduled_date' => $appointment->getDate(),
                'isDone' => $appointment->isDone(),
            ];
        }

        return $this->json([
            'appointments' => $data
        ]);
    }


    #[Route('/{appointmentId}', name: 'view_detail')]
    //TODO: implement
    public function viewAppointmentDetail($appointmentId): JsonResponse
    {
        $appointment = $this->repository->find($appointmentId);
        return $this->json($appointment);
    }

    #[Route('/assigned-appointments', name: 'view_assigned_appointments')]
    //TODO: implement
    public function viewAppointmentsAssigned(): JsonResponse
    {
        return $this->json([]);
    }

    #[Route('/create', name: 'create', methods: 'POST')]
    //TODO: implement
    public function createAppointment(): JsonResponse
    {
        return $this->json([]);
    }

}
