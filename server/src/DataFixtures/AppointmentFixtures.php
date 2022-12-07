<?php

namespace App\DataFixtures;

use App\Entity\Appointment;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

use Doctrine\Common\DataFixtures\DependentFixtureInterface;

class AppointmentFixtures extends Fixture implements DependentFixtureInterface
{

    public const APM1_REF = 'apm1-ref';
    public const APM2_REF = 'apm2-ref';
    public const APM3_REF = 'apm3-ref';

    public function load(ObjectManager $manager): void
    {
        $appointment1 = new Appointment();
        $appointment1->setPatientName("Anh Tung")
            ->setPatientGender(1)
            ->setPatientDob(\DateTime::createFromFormat('Y-m-d', '1999-11-19'))
            ->setPatientDepartment("Cardiology")
            ->setPatientMessage("I dont feel so good.")
            ->setDate(\DateTime::createFromFormat('Y-m-d', '2022-12-15'))
            ->setDone(false)
            ->setDoctorId($this->getReference(DoctorFixtures::DOC2_REF));
        $manager->persist($appointment1);
        $this->addReference(self::APM1_REF, $appointment1);

        $appointment2 = new Appointment();
        $appointment2->setPatientName("Tung Anh")
            ->setPatientGender(1)
            ->setPatientDob(\DateTime::createFromFormat('Y-m-d', '2014-5-28'))
            ->setPatientDepartment("Pediatrics")
            ->setPatientMessage("My child is having a stomache")
            ->setDate(\DateTime::createFromFormat('Y-m-d', '2022-11-30'))
            ->setDone(true)
            ->setDoctorId($this->getReference(DoctorFixtures::DOC2_REF));
        $manager->persist($appointment2);
        $this->addReference(self::APM2_REF, $appointment2);

        $appointment3 = new Appointment();
        $appointment3->setPatientName("Tram Anh")
            ->setPatientGender(2)
            ->setPatientDob(\DateTime::createFromFormat('Y-m-d', '2010-11-3'))
            ->setPatientDepartment("Pediatrics")
            ->setPatientMessage("I am not sure")
            ->setDate(\DateTime::createFromFormat('Y-m-d', '2022-12-20'))
            ->setDone(false)
            ->setDoctorId($this->getReference(DoctorFixtures::DOC1_REF));
        $manager->persist($appointment3);
        $this->addReference(self::APM3_REF, $appointment3);

        $manager->flush();
    }

    public function getDependencies()
    {
        return [
            DoctorFixtures::class
        ];
    }
}
