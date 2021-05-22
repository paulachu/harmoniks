import { Skill } from "src/skills/entities/skill.entity";

export class CreateRequestDto {
    title: string;
    description: string;
    skills: string[];
}