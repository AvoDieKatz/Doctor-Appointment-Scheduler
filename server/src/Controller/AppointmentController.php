<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/appointments', name: 'api_appointments_')]
class AppointmentController extends AbstractController
{
    #[Route('/', name: 'view_all')]
    //TODO: implement
    public function viewAllAppointments(): JsonResponse
    {
        return $this->json([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/AppointmentController.php',
        ]);
    }


    #[Route('/{appointmentId}', name: 'view_detail')]
    //TODO: implement
    public function viewAppointmentDetail($appointmentId): JsonResponse
    {
        return $this->json([]);
    }


    #[Route('/create', name: 'create', methods: 'POST')]
    //TODO: implement
    public function createAppointment(): JsonResponse
    {
        return $this->json([]);
    }

    
    #[Route('/update/{appointmentId}', name: 'update', methods: 'PUT')]
    //TODO: implement
    public function updateAppointment($appointmentId): JsonResponse
    {
        return $this->json([]);
    }

}
