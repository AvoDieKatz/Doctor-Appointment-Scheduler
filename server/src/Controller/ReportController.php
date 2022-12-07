<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

// #[Route('/api/report', name: 'api_report_')]
#[Route('/api/report')]

class ReportController extends AbstractController
{

    //EXAMPLE CODE POST
    #[Route('/post-example/{appointmentId}', name: 'create', methods: 'POST')]
    public function demo($appointmentId, Request $request): JsonResponse
    {
        //toArray() use json_decode internally
        $data = $request->toArray();
        //To get QUERY PARAMS, eg: ?lang=de&reg=de
        $language = $request->query->get('lang');
        $region = $request->query->get('reg');
        if (strcmp($region, 'de') == 0) {
            return $this->json([
                'botschaft' => 'Wilkommen Germany!',
                'weg' => 'src/Controller/ReportController.php',
                'appointmentId' => $appointmentId,
                'sprache' => $language,
                'ursprung' => $region,
                'daten' => $data,
                'name' => $data['name'],
                'alter' => $data['age'],
            ]);
        } elseif (strcmp($region, 'en') == 0) {
            return $this->json([
                'message' => 'Welcome to England!',
                'path' => 'src/Controller/ReportController.php',
                'appointmentId' => $appointmentId,
                'language' => $language,
                'region' => $region,
                'data' => $data,
                'name' => $data['name'],
                'age' => $data['age'],
            ]);
        } else {
            return $this->json([
                'error' => 'Uh oh'
            ]);
        }
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
