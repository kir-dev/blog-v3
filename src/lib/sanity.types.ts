import { ImageAsset, PortableTextBlock, Slug } from 'sanity'

export interface ReducedPost {
  _id: string
  _createdAt: string
  title?: string
  slug: Slug
}

export interface Post extends ReducedPost {
  _type: 'post'
  _updatedAt: string
  author?: string
  excerpt?: string
  mainImage?: ImageAsset
  estimatedReadingTime?: number
  hasToc?: boolean
  body: PortableTextBlock[]
  hashTag?: string
}

export type PostWithAuthor = {
  post: Post
  author?: Member
}

export interface SiteSection {
  _type: 'siteSection'
  _id: string
  _createdAt: string
  _updatedAt: string
  key: string
  body: PortableTextBlock[]
  isHidden?: boolean
}

export interface Member {
  _type: 'member'
  _id: string
  _createdAt: string
  pekUsername: string
  firstName: string
  lastName: string
  rank?: string
  isActive?: boolean
  mainImage?: ImageAsset
  hoverImage?: ImageAsset
  darkImage?: ImageAsset
  darkHoverImage?: ImageAsset
}

export interface TechStack {
  _type: 'techStack'
  _id: string
  _createdAt: string
  key: string
  name?: string
  body?: string
  priority?: number
}

export interface Project {
  _type: 'project'
  _id: string
  _createdAt: string
  _updatedAt: string
  title: string
  slug: Slug
  status?: string
  shortDesc?: string
  githubRepos?: string[]
  techStacks?: string[]
  homePageUrls?: string[]
  mainImage?: ImageAsset
  body?: PortableTextBlock[]
  priority?: number
}

export interface Course {
  _type: 'course'
  _id: string
  _createdAt: string
  title?: string
  isShown?: boolean
  priority?: number
  body?: PortableTextBlock[]
  lecturers?: string[]
  lectures?: {
    dateTimeInterval?: string
    place?: string
    getIconName?: string
  }[]
}
