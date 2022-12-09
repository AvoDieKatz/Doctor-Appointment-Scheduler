<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserFixtures extends Fixture
{
    public const USER1_REF = 'user1-ref';
    public const USER2_REF = 'user2-ref';
    public const USER3_REF = 'user3-ref';
    public const USER4_REF = 'user4-ref';
    public const USER5_REF = 'user5-ref';
    public const USER6_REF = 'user6-ref';

    private $hasher;

    //khai báo thư viện để mã hóa password
    public function __construct(UserPasswordHasherInterface $userPasswordHasherInterface)
    {
        $this->hasher = $userPasswordHasherInterface;
    }

    public function load(ObjectManager $manager): void
    {
        $user1 = new User();
        $user1->setUsername('nguyenvana')
            ->setPassword($this->hasher->hashPassword($user1, "123456"))
            ->setRoles([]);
        $manager->persist($user1);
        $this->addReference(self::USER1_REF, $user1);

        $user2 = new User();
        $user2->setUsername('admin')
            ->setPassword($this->hasher->hashPassword($user2, "admin"))
            ->setRoles(['ROLE_ADMIN']);
        $manager->persist($user2);
        $this->addReference(self::USER2_REF, $user2);

        $user3 = new User();
        $user3->setUsername('tranvanb')
            ->setPassword($this->hasher->hashPassword($user3, "doc123"))
            ->setRoles(['ROLE_DOCTOR']);
        $manager->persist($user3);
        $this->addReference(self::USER3_REF, $user3);

        $user4 = new User();
        $user4->setUsername('nguyenvanc')
            ->setPassword($this->hasher->hashPassword($user4, "654321"))
            ->setRoles([]);
        $manager->persist($user4);
        $this->addReference(self::USER4_REF, $user4);

        $user5 = new User();
        $user5->setUsername('vuvand')
            ->setPassword($this->hasher->hashPassword($user5, "doc321"))
            ->setRoles(['ROLE_DOCTOR']);
        $manager->persist($user5);
        $this->addReference(self::USER5_REF, $user5);

        $user6 = new User();
        $user6->setUsername('nguyenvanz')
            ->setPassword($this->hasher->hashPassword($user6, "doc321"))
            ->setRoles(['ROLE_DOCTOR']);
        $manager->persist($user6);
        $this->addReference(self::USER6_REF, $user6);

        $manager->flush();
    }
}
