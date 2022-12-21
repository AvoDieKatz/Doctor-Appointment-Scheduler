<?php

namespace App\Controller;

use App\Entity\Appointment;
use App\Repository\AppointmentRepository;
use App\Repository\DepartmentRepository;
use App\Repository\DoctorRepository;
use Doctrine\Persistence\ManagerRegistry;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
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
        This route returns all, waitting or completed appointments based on query string
    */
    #[IsGranted('ROLE_ADMIN')]
    #[Route('/', name: 'view_all', methods: 'GET')]
    public function viewAllAppointments(Request $request)
    {
        $appointments = $this->repository->findAll();
        //Get the query component
        $filterType = $request->query->get('filter');
        if ($filterType === "waiting") {
            $appointments = $this->repository->findBy(['done' => false]);
        } elseif ($filterType === "completed") {
            $appointments = $this->repository->findBy(['done' => true]);
        }
        if (!$appointments) {
            return $this->json(
                [],
                Response::HTTP_NO_CONTENT
            );
        }
        $data = [];
        foreach ($appointments as $appointment) {
            $data[] = [
                'id' => $appointment->getId(),
                'patientName' => $appointment->getPatientName(),
                'patientGender' => $appointment->getPatientGender(),
                'patientDob' => $appointment->getPatientDob(),
                'patientMessage' => $appointment->getPatientMessage(),
                'patientContact' => $appointment->getContact(),
                'scheduledDate' => $appointment->getDate(),
                'isDone' => $appointment->isDone(),
                'department' => $appointment->getPatientDepartment()->getName(),
                'doctor' => $appointment->getDoctor()->getName(),
            ];
        }
        return $this->json($data);
    }

    /*
        This route returns detailed information about the appointment
    */
    #[Security("is_granted('ROLE_ADMIN') or is_granted('ROLE_DOCTOR')")]
    #[Route('/{appointmentId}', name: 'view_detail', methods: 'GET')]
    public function viewAppointmentDetail($appointmentId): JsonResponse
    {
        $appointment = $this->repository->find($appointmentId);
        if (!$appointment) {
            return $this->json(
                [
                    'message' => 'The appointment does not exist'
                ],
                Response::HTTP_NO_CONTENT
            );
        }
        $data = [
            'id' => $appointment->getId(),
            'patientName' => $appointment->getPatientName(),
            'patientGender' => $appointment->getPatientGender(),
            'patientDob' => $appointment->getPatientDob(),
            'patientMessage' => $appointment->getPatientMessage(),
            'patientContact' => $appointment->getContact(),
            'scheduledDate' => $appointment->getDate(),
            'department' => $appointment->getPatientDepartment()->getName(),
            'doctor' => $appointment->getDoctor()->getName(),
            'isDone' => $appointment->isDone(),
        ];
        return $this->json(
            $data,
            Response::HTTP_OK,
        );
    }

    /*
        This route returns all the appointments assigned to a doctor by ID
    */
    #[Security("is_granted('ROLE_ADMIN') or is_granted('ROLE_DOCTOR')")]
    #[Route('/assigned/{doctorId}', name: 'view_assigned', methods: 'GET')]
    public function viewAppointmentsAssigned(DoctorRepository $doctorRepository, $doctorId): JsonResponse
    {
        // Find the doctor
        $doctor = $doctorRepository->find($doctorId);
        if (!$doctor) {
            return $this->json(
                ['message' => 'The doctor does not exist'],
                Response::HTTP_NOT_FOUND
            );
        }

        // Get all appointments related to the found doctor through Symfony provided method getAppointments() in Doctor Entity class
        $assigned_appointments = $doctor->getAppointments();

        return $this->json(
            $assigned_appointments,
            Response::HTTP_OK,
            [],
            [
                // Ignore some field to not include in the JSON response
                // We can format the response's data like the two endpoints above but by using IGNORED_ATTRIBUTES, we can do send response easier as we can pass the whole $appointment object directly
                ObjectNormalizer::IGNORED_ATTRIBUTES => ['doctor', 'patientDepartment'],
                ObjectNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object) {
                    return $object->getId();
                }
            ]
        );
    }


    /*
        This route will create a new appointment
    */
    #[Route('/create', name: 'create', methods: 'POST')]
    public function createAppointment(DepartmentRepository $departmentRepository, Request $request): JsonResponse
    {
        // Create an empty Appointment object
        $appointment = new Appointment;

        // Decode the request sent, toArray() use json_encode internally
        $data = $request->toArray();

        // Find the chosen Department
        $department = $departmentRepository->findOneBy(['id' => $data['departmentId'], 'deleted' => false]);

        $doctor = null;

        if ($department) {
            // Get all the doctors belong to that department, this will return an array of
            $department_doctors = $department->getDoctors();
            // A loop to iterate all the doctors found in this Department
            // and check if its ID match the ID from client's request
            // also check if the doctor is deleted
            foreach ($department_doctors as $department_doctor) {
                if ($department_doctor->getId() === $data['doctorId'] && $department_doctor->isDeleted() === false) {
                    $doctor = $department_doctor;
                }
            }
        }

        // Because if the department is null, it will pass the previous 'if', the doctor variable will not be updated, therefore this 'if' will run
        if (!$doctor) {
            return $this->json(
                ['message' => 'Bad request'],
                Response::HTTP_BAD_REQUEST
            );
        }

        // If both Department and Doctor are not null, proceed to add to the Appointment object
        $appointment->setPatientName($data['patientName'])
            ->setPatientDob(\DateTime::createFromFormat('m/d/Y', $data['dob']))
            ->setPatientGender($data['gender'])
            ->setPatientDepartment($department)
            ->setDoctor($doctor)
            ->setDate(\DateTime::createFromFormat('m/d/Y', $data['appointedDate']))
            ->setPatientMessage($data['patientMessage'])
            ->setContact($data['patientContact'])
            ->setDone(false);

        // Let doctrine create a new row in database
        $this->manager->persist($appointment);
        $this->manager->flush();

        return $this->json(
            ['message' => 'The appointment is succesfully created'],
            Response::HTTP_CREATED,
        );
    }
}
