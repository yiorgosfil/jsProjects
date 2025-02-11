const forumLatest = "https://forum-proxy.freecodecamp.rocks/latest"
const forumTopicUrl = "https://forum.freecodecamp.org/t/"
const forumCategoryUrl = "https://forum.freecodecamp.org/c/"
const avatarUrl = "https://sea1.discourse-cdn.com/freecodecamp"

const postsContainer = document.getElementById("posts-container") as HTMLTableSectionElement

type Category = {
  category: string
  className: string
}

type Categories = Record<number, Category>

type SelectedCategory = Partial<Category> & { id: number }

type User = {
  id: number
  username: string
  name: string
  avatar_template: string
  trust_level: number
  moderator?: boolean
}

type Poster = Partial<User> & { user_id: number }


const allCategories: Categories = {
  299: { category: "Career Advice", className: "career" },
  409: { category: "Project Feedback", className: "feedback" },
  417: { category: "freeCodeCamp Support", className: "support" },
  421: { category: "JavaScript", className: "javascript" },
  423: { category: "HTML - CSS", className: "html-css" },
  424: { category: "Python", className: "python" },
  432: { category: "You Can Do This!", className: "motivation" },
  560: { category: "Backend Development", className: "backend" },
}

function forumCategory(id: number): string {
  let selectedCategory: SelectedCategory = {
    id,
    category: '',
    className: '',
  }

  if (allCategories.hasOwnProperty(id)) {
    const { category, className } = allCategories[id]

    selectedCategory.category = category
    selectedCategory.className = className
  } else {
    selectedCategory.category = 'General'
    selectedCategory.className = 'general'
    selectedCategory.id = id
  }

  const url = `${forumCategoryUrl}${selectedCategory.className}/${id}`
  const linkText = selectedCategory.category
  const linkClass = `category ${selectedCategory.className}`

  return `<a href="${url}" class="${linkClass}" target="_blank">
            ${linkText}
          </a>`
}

function timeAgo(time: number): string {
  const currentTime: Date = new Date()
  const lastPost: Date = new Date(time)
  const timeDifference: number = currentTime.getTime() - lastPost.getTime()
  const msPerMin = 1000 * 60

  const minutesAgo = Math.floor(timeDifference / msPerMin)
  const hoursAgo = Math.floor(minutesAgo / 60)
  const daysAgo = Math.floor(hoursAgo / 24)

  if (minutesAgo < 60) {
    return `${minutesAgo}m ago`
  }

  if (hoursAgo < 24) {
    return `${hoursAgo}h ago`
  }

  return `${daysAgo}d ago`
}

function viewCount(views: number): string | number {
  const thousands = Math.floor(views / 1000)

  if (views >= 1000) {
    return `${thousands}k`
  }

  return views
}

function avatars(posters: Poster[], users: User[]) {
  return posters.map(poster => {
    const user: User | undefined = users.find(user => user.id = poster.user_id)
    if (user) {
      const avatar = user.avatar_template.replace(/{size}/, '30')
      const userAvatarUrl = avatar.startsWith('/user_avatar/')
        ? avatarUrl.concat(avatar)
        : avatar
      return `<img src="${userAvatarUrl} alt="${user.name}" />`
    }
  }).join('')
}

function showLatestPosts(data: any) {
  const { topic_list, users } = data
  const { topics } = topic_list

  postsContainer.innerHTML = topics.map((topic: any) => {
    const {
      id,
      title,
      views,
      posts_count,
      slug,
      posters,
      category_id,
      bumped_at
    } = topic

    return `
        <tr>
          <td>
            <a class="post-title" target="_blank" href="${forumTopicUrl}${slug}/${id}">${title}</a>
            ${forumCategory(category_id)}
          </td>
          <td>
            <div class="avatar-container">
              ${avatars(posters, users)}
            </div>
          </td>
          <td>${posts_count - 1}</td>
          <td>${viewCount(views)}</td>
          <td>${timeAgo(bumped_at)}</td>
        </tr>
      `
  }).join('')
}

async function fetchData() {
  try {
    const res = await fetch(forumLatest)

    if (!res.ok) {
      throw Error(`HTTP error. Status: ${res.status}`)
    }

    const data = await res.json()
    console.log('Fetched data', data)
    showLatestPosts(data)
    // console.log(data)
  } catch (error: any) {
    console.log(error)
  }
}

fetchData()
