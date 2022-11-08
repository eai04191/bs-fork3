import fs from "node:fs";
import path from "node:path";

export type Role = "STRIKER" | "SPECIAL";
export type Atk = "爆発" | "貫通" | "神秘";
export type Def = "軽装" | "重装" | "特殊";
export type Position = "FRONT" | "MIDDLE" | "BACK";
export type School = "アビドス" | "ゲヘナ" | "百鬼夜行" | "ミレニアム";
export type Student = {
    URL: string;
    Name: string;
    FullName: string;
    Ruby: string;
    Role: Role;
    Weapon: string;
    Position: Position;
    Class: string;
    School: School;
    Atk: Atk;
    Def: Def;
    Town_apt: string;
    Outdoor_apt: string;
    Indoor_apt: string;
    Equip1: string;
    Equip2: string;
    Equip3: string;
    Birthday: string;
};

const studentsDirectory = path.join(process.cwd(), "data", "students");
const students = JSON.parse(
    fs.readFileSync(path.join(studentsDirectory, "students.json"), "utf8")
) as Student[];

export function getAllStudents() {
    return students;
}
