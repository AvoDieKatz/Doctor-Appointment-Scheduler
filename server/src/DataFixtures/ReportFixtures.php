<?php

namespace App\DataFixtures;

use App\Entity\Report;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

use Doctrine\Common\DataFixtures\DependentFixtureInterface;

class ReportFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $report1 = new Report();
        $report1->setDatetime(\DateTime::createFromFormat('Y-m-d H:i:s', '2022-11-30 15:35:14'))
            ->setBloodPressure(118)
            ->setOxygen(99)
            ->setWeight(45)
            ->setMessage("The patient is normal just need a good rest")
            ->setAppointmentId($this->getReference(AppointmentFixtures::APM2_REF));
        $manager->persist($report1);
        $manager->flush();
    }

    public function getDependencies()
    {
        return [
            AppointmentFixtures::class
        ];
    }
}
