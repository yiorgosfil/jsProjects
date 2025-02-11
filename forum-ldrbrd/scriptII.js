"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const forumLatest = "https://forum-proxy.freecodecamp.rocks/latest";
const forumTopicUrl = "https://forum.freecodecamp.org/t/";
const forumCategoryUrl = "https://forum.freecodecamp.org/c/";
const avatarUrl = "https://sea1.discourse-cdn.com/freecodecamp";
const postsContainer = document.getElementById("posts-container");
const allCategories = {
    299: { category: "Career Advice", className: "career" },
    409: { category: "Project Feedback", className: "feedback" },
    417: { category: "freeCodeCamp Support", className: "support" },
    421: { category: "JavaScript", className: "javascript" },
    423: { category: "HTML - CSS", className: "html-css" },
    424: { category: "Python", className: "python" },
    432: { category: "You Can Do This!", className: "motivation" },
    560: { category: "Backend Development", className: "backend" },
};
function forumCategory(id) {
    let selectedCategory = {
        id,
        category: '',
        className: '',
    };
    if (allCategories.hasOwnProperty(id)) {
        const { category, className } = allCategories[id];
        selectedCategory.category = category;
        selectedCategory.className = className;
    }
    else {
        selectedCategory.category = 'General';
        selectedCategory.className = 'general';
        selectedCategory.id = id;
    }
    const url = `${forumCategoryUrl}${selectedCategory.className}/${id}`;
    const linkText = selectedCategory.category;
    const linkClass = `category ${selectedCategory.className}`;
    return `<a href="${url}" class="${linkClass}" target="_blank">
            ${linkText}
          </a>`;
}
function timeAgo(time) {
    const currentTime = new Date();
    const lastPost = new Date(time);
    const timeDifference = currentTime.getTime() - lastPost.getTime();
    const msPerMin = 1000 * 60;
    const minutesAgo = Math.floor(timeDifference / msPerMin);
    const hoursAgo = Math.floor(minutesAgo / 60);
    const daysAgo = Math.floor(hoursAgo / 24);
    if (minutesAgo < 60) {
        return `${minutesAgo}m ago`;
    }
    if (hoursAgo < 24) {
        return `${hoursAgo}h ago`;
    }
    return `${daysAgo}d ago`;
}
function viewCount(views) {
    const thousands = Math.floor(views / 1000);
    if (views >= 1000) {
        return `${thousands}k`;
    }
    return views;
}
function avatars(posters, users) {
    return posters.map(poster => {
        const user = users.find(user => user.id = poster.user_id);
        if (user) {
            const avatar = user.avatar_template.replace(/{size}/, '30');
            const userAvatarUrl = avatar.startsWith('/user_avatar/')
                ? avatarUrl.concat(avatar)
                : avatar;
            return `<img src="${userAvatarUrl} alt="${user.name}" />`;
        }
    }).join('');
}
function showLatestPosts(data) {
    const { topic_list, users } = data;
    const { topics } = topic_list;
    postsContainer.innerHTML = topics.map((topic) => {
        const { id, title, views, posts_count, slug, posters, category_id, bumped_at } = topic;
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
      `;
    }).join('');
}
function fetchData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch(forumLatest);
            if (!res.ok) {
                throw Error(`HTTP error. Status: ${res.status}`);
            }
            const data = yield res.json();
            console.log('Fetched data', data);
            showLatestPosts(data);
            // console.log(data)
        }
        catch (error) {
            console.log(error);
        }
    });
}
fetchData();
