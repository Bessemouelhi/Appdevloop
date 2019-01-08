<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Message;
use AppBundle\Form\Type\ContactType;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Session\Session;

class ContactController extends Controller
{
    /**
     * @Route("/contact", name="contact")
     */
    public function contactAction(Request $request)
    {
        $session = new Session();
        $message = new Message();

        $form = $this->createForm(ContactType::class, $message);
        $form->handleRequest($request);

        if ($form->isValid())
        {
            $message = $form->getData();

            $html = '<h3>'. $message->getName() .'</h3><p>'.$message->getMessage().'</p>';
            //$html += '<p>'.$message->getMessage().'</p>';

            $mail = \Swift_Message::newInstance()
                ->setSubject('Hello SwiftMailer')
                ->setFrom($message->getEmail())
                ->setTo('zyvilin.b@gmail.com')
                ->setBody($html,
                    'text/html'
                )
                /*
                 * If you also want to include a plaintext version of the message
                ->addPart(
                    $this->renderView(
                        'Emails/registration.txt.twig',
                        array('name' => $name)
                    ),
                    'text/plain'
                )
                */
            ;
            if ($this->get('mailer')->send($mail))
            {
                $session->getFlashBag()->add('info', 'Votre message a été envoyé avec succès !');
            }
            else
            {
                $session->getFlashBag()->add('warning', 'Votre message n\'a pas été envoyé !');
            }

            $em = $this->getDoctrine()->getManager();
            $em->persist($message);
            $em->flush();



            return $this->redirectToRoute('homepage');
        }

        // replace this example code with whatever you need
        return $this->render('contact/contact.html.twig', ['form' => $form->createView()]);
    }
}
