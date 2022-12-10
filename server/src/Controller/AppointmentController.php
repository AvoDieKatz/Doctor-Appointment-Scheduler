<?php

namespace App\Controller;

use App\Repository\AppointmentRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

#[Route('/api/appointments', name: 'api_appointments_')]
class AppointmentController extends AbstractController
{

    private $repository, $manager;

    public function __construct(AppointmentRepository $appointmentRepository, ManagerRegistry $managerRegistry)
    {
        $this->repository = $appointmentRepository;
        $this->manager = $managerRegistry->getManager();
    }

    /*
        This route returns all appointments and their attributes
    */
    #[Route('/', name: 'view_all', methods: 'GET')]
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
        return $this->json($data);
    }

    /*
        This route returns detailed information about the appointment
    */
    #[Route('/{appointmentId}', name: 'view_detail', methods: 'GET')]
    public function viewAppointmentDetail($appointmentId): JsonResponse
    {
        $appointment = $this->repository->find($appointmentId);
        $data = [
            'id' => $appointment->getId(),
            'patient_name' => $appointment->getPatientName(),
            'patient_gender' => $appointment->getPatientGender(),
            'patient_dob' => $appointment->getPatientDob(),
            'patient_message' => $appointment->getPatientMessage(),
            'scheduled_date' => $appointment->getDate(),
            'isDone' => $appointment->isDone(),
            'patient_department' => $appointment->getPatientDepartment()->getName(),
            'doctor' => $appointment->getDoctor()->getName(),
        ];
        return $this->json($data, Response::HTTP_OK,
        [],
        [
            ObjectNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object) {
                return $object->getId();
            }
        ]);
    }

    /*
        This route returns all the appointments assigned to a doctor
    */
    #[Route('/assigned/doctor/{doctorId}', name: 'view_assigned', methods: 'GET')]
    //TODO: implement
    public function viewAppointmentsAssigned($doctorId): JsonResponse
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
