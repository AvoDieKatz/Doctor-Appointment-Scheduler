<?php

namespace App\Controller;

use App\Entity\Appointment;
use App\Repository\AppointmentRepository;
use App\Repository\DepartmentRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
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
        if (!$appointment) {
            throw $this->createNotFoundException('The request appointment does not exist');
        }
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
        return $this->json(
            $data,
            Response::HTTP_OK,
            [],
            [
                ObjectNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object) {
                    return $object->getId();
                }
            ]
        );
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
    public function createAppointment(DepartmentRepository $departmentRepository, Request $request): JsonResponse
    {
        // Create an empty Appointment object
        $appointment = new Appointment;

        // Decode the request sent, toArray() use json_encode internally
        $data = $request->toArray();

        // Find the chosen Department
        $department = $departmentRepository->find($data['department_id']);

        $doctor = null;

        if ($department != null) {
            // Get all the doctors belong to that department, this will return an array of
            $department_doctors = $department->getDoctors();
            // A loop to iterate all the doctors found in this Department and check if its ID match the ID from client's request
            foreach ($department_doctors as $department_doctor) {
                if ($department_doctor->getId() === $data['doctor_id']) {
                    $doctor = $department_doctor;
                }
            }
        }

        // Because if the department is null, it will pass the previous 'if', the doctor variable will not be updated, therefore this 'if' will run
        if ($doctor == null) {
            return $this->json(
                Response::HTTP_BAD_REQUEST
            );
        }

        // If both Department and Doctor are not null, proceed to add to the Appointment object
        $appointment->setPatientName($data['patient_name'])
            ->setPatientDob(\DateTime::createFromFormat('m/d/Y', $data['dob']))
            ->setPatientGender($data['gender'])
            ->setPatientDepartment($department)
            ->setDoctor($doctor)
            ->setDate(\DateTime::createFromFormat('m/d/Y', $data['appointed_date']))
            ->setPatientMessage($data['patient_message'])
            ->setDone(false);

        // Let doctrine create a new row in database
        $this->manager->persist($appointment);
        $this->manager->flush();

        return $this->json(
            ['message' => 'The appointment is succesfully created'],
            Response::HTTP_OK,
        );
    }
}
