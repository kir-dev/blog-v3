import { ClockIcon, MapPinIcon, UserIcon } from '@heroicons/react/24/solid'
import { RichText } from '~/components/RichText'
import type { Course } from '~/payload-types'

export default function CoursePreview({ course }: { course: Course }) {
  return (
    <div className="w-full">
      <header>
        <h4 className="text-3xl font-extrabold tracking-tight my-2">
          {course.title}
        </h4>
        {course.lectures?.map((lecture, idx) => (
          <div
            key={lecture.id ?? `${lecture.dateTimeInterval}-${idx}`}
            className="border-b border-foreground border-opacity-20"
          >
            {lecture.description && (
              <div className="flex items-center gap-2 pt-2">
                {lecture.getIconName ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={`https://github.com/get-icon/geticon/raw/master/icons/${lecture.getIconName}.svg`}
                    alt={lecture.getIconName}
                    width="20px"
                    height="20px"
                  />
                ) : (
                  <ClockIcon className="w-5 h-5 fill-current" />
                )}
                <div>{lecture.description}</div>
              </div>
            )}
            <div className="flex flex-row flex-wrap justify-between text-foreground py-2 gap-2">
              <div className="flex items-center gap-2">
                {lecture.description ? (
                  <div className="w-5" />
                ) : lecture.getIconName ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={`https://github.com/get-icon/geticon/raw/master/icons/${lecture.getIconName}.svg`}
                    alt={lecture.getIconName}
                    width="20px"
                    height="20px"
                  />
                ) : (
                  <ClockIcon className="w-5 h-5 fill-current" />
                )}
                <div>{lecture.dateTimeInterval}</div>
              </div>
              <div className="flex items-center gap-2">
                <MapPinIcon className="w-5 h-5 fill-current" />
                <div>{lecture.place}</div>
              </div>
            </div>
          </div>
        ))}
      </header>
      <footer className="text-foreground text-opacity-70 mt-6">
        {course.lecturers?.map((lecturer, idx) => (
          <div
            key={lecturer.id ?? `${lecturer.name}-${idx}`}
            className="flex items-center gap-2 mt-1 text-foreground"
          >
            <UserIcon className="w-4 h-4 fill-current" />
            <div>{lecturer.name}</div>
          </div>
        ))}
        <div className="mt-4">
          <RichText data={course.body} variant="common" />
        </div>
      </footer>
    </div>
  )
}
