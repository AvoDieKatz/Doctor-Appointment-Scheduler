<?php

namespace App\Entity;

use App\Repository\AppointmentRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: AppointmentRepository::class)]
class Appointment
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $patient_name = null;

    #[ORM\Column(type: Types::SMALLINT)]
    private ?int $patient_gender = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $patient_dob = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $patient_message = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $date = null;

    #[ORM\Column]
    private ?bool $done = null;

    #[ORM\ManyToOne(inversedBy: 'appointments')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Doctor $doctor = null;

    #[ORM\ManyToOne(inversedBy: 'appointments')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Department $patient_department = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPatientName(): ?string
    {
        return $this->patient_name;
    }

    public function setPatientName(string $patient_name): self
    {
        $this->patient_name = $patient_name;

        return $this;
    }

    public function getPatientGender(): ?int
    {
        return $this->patient_gender;
    }

    public function setPatientGender(int $patient_gender): self
    {
        $this->patient_gender = $patient_gender;

        return $this;
    }

    public function getPatientDob(): ?\DateTimeInterface
    {
        return $this->patient_dob;
    }

    public function setPatientDob(\DateTimeInterface $patient_dob): self
    {
        $this->patient_dob = $patient_dob;

        return $this;
    }

    public function getPatientMessage(): ?string
    {
        return $this->patient_message;
    }

    public function setPatientMessage(?string $patient_message): self
    {
        $this->patient_message = $patient_message;

        return $this;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): self
    {
        $this->date = $date;

        return $this;
    }

    public function isDone(): ?bool
    {
        return $this->done;
    }

    public function setDone(bool $done): self
    {
        $this->done = $done;

        return $this;
    }

    public function getDoctor(): ?Doctor
    {
        return $this->doctor;
    }

    public function setDoctor(?Doctor $doctor): self
    {
        $this->doctor = $doctor;

        return $this;
    }

    public function getPatientDepartment(): ?Department
    {
        return $this->patient_department;
    }

    public function setPatientDepartment(?Department $patient_department): self
    {
        $this->patient_department = $patient_department;

        return $this;
    }

}
