<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="homepage")
     */
    public function indexAction(Request $request)
    {
        return $this->render('default/index.html.twig', []);
    }

    /**
     * @Route("/about",name="about")
     */
    public function aboutAction()
    {
        $readmeContent = '';

        $readmeFile = $this->getParameter('kernel.root_dir') . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'README.md';
        if (file_exists($readmeFile)) {
            $readmeContent = file_get_contents($readmeFile);
        }

        return $this->render(':default:about.html.twig', ['readme_content' => $readmeContent]);
    }
}
