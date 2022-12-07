<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/doctor', name: 'api_doctor_')]
class DoctorController extends AbstractController
{
    #[Route('/appointments', name: 'view_assigned_appointments')]
    public function viewAppointmentsAssigned(): JsonResponse
    {
        return $this->json([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/DoctorController.php',
        ]);
    }

}
