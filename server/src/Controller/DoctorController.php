<?php

namespace App\Controller;

use App\Repository\DoctorRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/doctors', name: 'api_doctor_')]
class DoctorController extends AbstractController
{

    private $repository, $manager;

    public function __construct(DoctorRepository $doctorRepository, ManagerRegistry $managerRegistry)
    {
        $this->repository = $doctorRepository;
        $this->manager = $managerRegistry->getManager();
    }

    #[Route('/', name: 'view_all', methods: 'GET')]
    public function viewAllDoctor(): JsonResponse
    {
        return $this->json([]);
    }

    #[Route('/{doctorId}', name: 'view_detail', methods: 'GET')]
    public function viewDoctorDetail(): JsonResponse
    {
        return $this->json([]);
    }
    
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
