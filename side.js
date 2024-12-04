function createSidebar() {
    const sidebar = document.createElement('div');
    sidebar.className = 'sidebar';
    sidebar.innerHTML = `
        <h3>使用者資訊</h3>
        <div id="userInfoArea">
            <!-- 登入後顯示的內容 -->
            <div id="loggedInContent" style="display: none;">
                <p>使用者：<span id="userAccount"></span></p>
                <button class="btn" onclick="window.location.href='./user.html'">個人頁面</button>
                <button class="btn" onclick="handleCreatePost()">發表文章</button>
                <button class="btn" onclick="goBack()">返回</button>
                <button class="btn btn-danger" onclick="handleLogout()">登出</button>
            </div>
            <!-- 未登入顯示的內容 -->
            <div id="notLoggedInContent">
                <p>訪客</p>
                <button class="btn" onclick="window.location.href='./login.html'">登入/註冊</button>
                <button class="btn" onclick="goBack()">返回</button>
            </div>
        </div>
    `;
    return sidebar;
}

function handleCreatePost() {
    if (!localStorage.getItem('token')) {
        if (confirm('需要登入才能發表文章，是否前往登入？')) {
            window.location.href = './login.html';
        }
        return;
    }

    const width = 600;
    const height = 500;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;

    window.open(
        'addPost.html',
        'postWindow',
        `width=${width},height=${height},left=${left},top=${top}`
    );
}

async function getUserInfo() {
    const token = localStorage.getItem('token');
    if (!token) {
        document.getElementById('loggedInContent').style.display = 'none';
        document.getElementById('notLoggedInContent').style.display = 'block';
        return false;
    }

    try {
        const response = await axios.get('http://localhost:3000/user/getUserInfo', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        document.getElementById('userAccount').textContent = response.data.data.account;
        document.getElementById('loggedInContent').style.display = 'block';
        document.getElementById('notLoggedInContent').style.display = 'none';
        return true;
    } catch (error) {
        document.getElementById('loggedInContent').style.display = 'none';
        document.getElementById('notLoggedInContent').style.display = 'block';
        return false;
    }
}

function handleLogout() {
    localStorage.removeItem('token');
    window.location.reload();
}

function goBack() {
    window.location.href = './home.html';
}