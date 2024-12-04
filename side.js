function createSidebar() {
    const sidebar = document.createElement('div');
    sidebar.className = 'sidebar';
    sidebar.innerHTML = `
        <h3>使用者資訊</h3>
        <div id="userInfoArea">

            <!-- 登入才會顯示的內容 -->
            <div id="loggedInContent" style="display: none;">
                <p>使用者：<span id="userAccount"></span></p>
                <button class="btn" onclick="window.location.href='./user.html'">個人頁面</button>
                <button class="btn" onclick="createPost()">發表文章</button>
                <button class="btn" onclick="goBack()">返回首頁</button>
                <button class="btn btn-danger" onclick="logout()">登出</button>
            </div>

            <!-- 未登入時顯示 -->
            <div id="notLoggedInContent">
                <p>訪客</p>
                <button class="btn" onclick="window.location.href='./login.html'">登入/註冊</button>
                <button class="btn" onclick="goBack()">返回</button>
            </div>

        </div>
    `;
    return sidebar;
}

function createPost() {
    if (!localStorage.getItem('token')) {
        if (confirm('請先登入')) {
            window.location.href = './login.html';
        }
        return;
    }

    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;

    window.open(
        'addPost.html',
        'postWindow',
        `width=600,height=500,left=${left},top=${top}`
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

function logout() {
    localStorage.removeItem('token');
    window.location.reload();
}

function goBack() {
    window.location.href = './index.html';
}