import { InferGetStaticPropsType } from "next";
import Head from "next/head";
import clsx from "clsx";
import { overrideTailwindClasses } from "tailwind-override";
import { createTitle } from "../../lib/title";
import {
  Atk,
  Def,
  getAllStudents,
  Position,
  Role,
  School,
  Student,
} from "../../lib/students";
import { useState } from "react";

type Filter = {
  role: Role[];
  atk: Atk[];
  def: Def[];
  position: Position[];
  school: School[];
  // name: string;
};

function FilterButton({
  active,
  children,
  ...props
}: {
  active: boolean;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={clsx(
        "rounded bg-white px-3 py-1 text-lg text-gray-600 shadow transition-colors hover:bg-gray-100",
        active && "bg-gray-900 text-white hover:bg-gray-800",
        props.className
      )}
    >
      {children}
    </button>
  );
}

function ButtonWrapper({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-2xl">{title}</p>
      <div className="flex gap-4">{children}</div>
    </div>
  );
}

function StudentCard({ student }: { student: Student }) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-white p-4 px-6 shadow">
      <div className="flex items-center gap-4">
        <img
          src="https://github.com/eai04191.png"
          className={clsx(
            "box-content aspect-square h-16 w-16 rounded border-l-8",
            student.Role === "STRIKER" && "border-red-700",
            student.Role === "SPECIAL" && "border-blue-800"
          )}
          alt=""
        />
        <div className="flex flex-col gap-0">
          <p className="text-sm">{student.Ruby}</p>
          <p className="text-2xl">{student.FullName}</p>
        </div>
      </div>
      <div className="mt-auto flex gap-2">
        <Pill
          className={clsx(
            student.Atk === "爆発" && "bg-student-red",
            student.Atk === "貫通" && "bg-student-yellow",
            student.Atk === "神秘" && "bg-student-blue"
          )}
        >
          {student.Atk}
        </Pill>
        <Pill
          className={clsx(
            student.Def === "軽装" && "bg-student-red",
            student.Def === "重装" && "bg-student-yellow",
            student.Def === "特殊" && "bg-student-blue"
          )}
        >
          {student.Def}
        </Pill>
        <Pill>{student.Position}</Pill>
        <Pill>{student.Class}</Pill>
      </div>
    </div>
  );
}

function Pill({
  children,
  ...props
}: { children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={overrideTailwindClasses(
        clsx(
          "flex overflow-hidden break-keep rounded-full bg-student-gray p-0.5 px-4 text-white",
          props.className
        )
      )}
    >
      {children}
    </div>
  );
}

export default function StudentsPage({
  students,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [filter, setFilter] = useState<Filter>({
    role: [],
    atk: [],
    def: [],
    position: [],
    school: [],
    // name: "",
  });

  const filteredStudents = students.filter((student) => {
    const role = filter.role.length === 0 || filter.role.includes(student.Role);
    const atk = filter.atk.length === 0 || filter.atk.includes(student.Atk);
    const def = filter.def.length === 0 || filter.def.includes(student.Def);
    const position =
      filter.position.length === 0 ||
      filter.position.includes(student.Position);
    const school =
      filter.school.length === 0 || filter.school.includes(student.School);
    // const name = student.Name.includes(filter.name);

    return role && atk && def && position && school;
  });

  // TODO: TS対応
  function updateFilter(
    key: keyof Filter,
    value: Role | Atk | Def | Position | School
  ) {
    return () => {
      const newFilter = { ...filter };
      //@ts-ignore
      const include = newFilter[key].includes(value);
      if (include) {
        //@ts-ignore
        newFilter[key] = newFilter[key].filter((v) => v !== value);
      } else {
        //@ts-ignore
        newFilter[key] = [...newFilter[key], value];
      }
      setFilter(newFilter);
    };
  }

  return (
    <>
      <Head>
        <title>{createTitle("生徒一覧")}</title>
      </Head>

      <div className="container mx-auto mt-8 flex max-w-5xl flex-col gap-8">
        <ButtonWrapper title="役割">
          <FilterButton
            active={filter.role.includes("STRIKER")}
            onClick={updateFilter("role", "STRIKER")}
          >
            STRIKER
          </FilterButton>
          <FilterButton
            active={filter.role.includes("SPECIAL")}
            onClick={updateFilter("role", "SPECIAL")}
          >
            SPECIAL
          </FilterButton>
        </ButtonWrapper>
        <ButtonWrapper title="攻撃属性">
          <FilterButton
            active={filter.atk.includes("爆発")}
            onClick={updateFilter("atk", "爆発")}
          >
            爆破
          </FilterButton>
          <FilterButton
            active={filter.atk.includes("貫通")}
            onClick={updateFilter("atk", "貫通")}
          >
            貫通
          </FilterButton>
          <FilterButton
            active={filter.atk.includes("神秘")}
            onClick={updateFilter("atk", "神秘")}
          >
            神秘
          </FilterButton>
        </ButtonWrapper>

        <p>{filteredStudents.length} students</p>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {filteredStudents.map((student) => (
            <StudentCard student={student} key={student.FullName} />
          ))}
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const students = getAllStudents();
  return {
    props: {
      students,
    },
  };
}
