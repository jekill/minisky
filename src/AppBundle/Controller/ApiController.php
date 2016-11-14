<?php

namespace AppBundle\Controller;

use AppBundle\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @author: Eugeny Fomin <info@jeka.ru>
 * @Route("/api")
 */
class ApiController extends Controller
{
    /**
     * @Route("/token")
     */
    public function getTokenAction(Request $request)
    {

        $user = new User();
        $user->setUsername('Sponge Bob');
        $t = $this->get('lexik_jwt_authentication.jwt_manager')
                  ->create($user)
        ;
//        new Username
//        $this->get('doctrine.orm.entity_manager')->persist($user);
//        $this->get('doctrine.orm.entity_manager')->flush();

//        $t = $this->get('lexik_jwt_authentication.jwt_token_authenticator')
//                  ->createAuthenticatedToken($user,'username');

        return new JsonResponse(['token' => $t], Response::HTTP_CREATED);
    }

    /**
     * @Route("/words")
     */
    public function getWordsAction(Request $request)
    {
        $words = $this->get('app.word.repository')->findAll();

        return new JsonResponse($words, 200);
    }
}