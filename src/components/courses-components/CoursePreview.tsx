import { ClockIcon, MapPinIcon, UserIcon } from '@heroicons/react/24/solid'
import { PortableText } from '@portabletext/react'
import { Course } from '~/lib/sanity.types'
import { commonSerializer } from '~/utils/serializers/common.serializer'

export default function CoursePreview({ course }: { course: Course }) {
  return (
    <div className="w-full">
      <header>
        <h4 className="text-3xl font-extrabold tracking-tight my-2">
          {course.title}
        </h4>
        {course.lectures?.map((lecture) => (
          <div className="border-b border-foreground border-opacity-20">
            {lecture.description && (
              <div className="flex items-center gap-2 pt-2">
                {lecture.getIconName ? (
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
            <div
              key={lecture.dateTimeInterval}
              className="flex flex-row flex-wrap justify-between text-foreground py-2 gap-2"
            >
              <div className="flex items-center gap-2">
                {lecture.description ? (
                  <div className="w-5"></div>
                ) : lecture.getIconName ? (
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
        {course.lecturers?.map((lecturer) => (
          <div
            key={lecturer}
            className="flex items-center gap-2 mt-1 text-foreground"
          >
            <UserIcon className="w-4 h-4 fill-current" />
            <div>{lecturer}</div>
          </div>
        ))}
        <div className="mt-4">
          <PortableText
            value={course.body ?? []}
            components={commonSerializer}
          />
        </div>
      </footer>
    </div>
  )
}
