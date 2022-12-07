<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/user', name: 'api_user_')]
class UserController extends AbstractController
{
    #[Route('/login', name: 'login')]
    //TODO: implement
    public function login(): JsonResponse
    {
        return $this->json([
            
        ]);
    }
    
    #[Route('/register', name: 'register')]
    //TODO: implement
    public function register(): JsonResponse
    {
        return $this->json([

        ]);
    }

    #[Route('/logout', name: 'logout')]
    //Todo: implement
    public function logout(): JsonResponse
    {
        return $this->json([

        ]);
    }
    
}
