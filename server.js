<!DOCTYPE html>
<html lang="de" class="dark h-full">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Gewickelt - ABDL & FLR Lifestyle</title>

    <!-- APP FAVICON & STARTBILDSCHIRM ICON -->
    <link rel="icon" type="image/png" href="https://i.ibb.co/L8mY8p8/gewickelt-logo.png">
    <link rel="apple-touch-icon" href="https://i.ibb.co/L8mY8p8/gewickelt-logo.png">

    <!-- PLAY STORE / SOCIAL SHARING META TAGS (OPEN GRAPH) -->
    <meta property="og:title" content="Gewickelt - ABDL & FLR Lifestyle Community">
    <meta property="og:description" content="Sicherer Austausch, Tagebuch und Community für ABDL & FLR (18+).">
    <meta property="og:image" content="https://i.ibb.co/L8mY8p8/gewickelt-logo.png">
    <meta property="og:type" content="website">

    <!-- MOBILE & CHROMIUM WEB APP EINSTELLUNGEN -->
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="theme-color" content="#0b0f1d">

    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        app: { bg: '#0b0f1d', card: '#161c2e', cardBorder: '#232d47', input: '#0f1424', accent: '#8b5cf6', pink: '#ec4899', textMuted: '#8f9bba' }
                    }
                }
            }
        }
    </script>
    <style>
        body { font-family: 'Inter', sans-serif; -webkit-tap-highlight-color: transparent; }
        html.dark body { background-color: #0b0f1d; color: #e2e8f0; }
        html:not(.dark) body { background-color: #e6ebf2; color: #0f172a; }
        
        html.dark .custom-card { background-color: #161c2e; border-color: #232d47; color: #e2e8f0; }
        html:not(.dark) .custom-card { background-color: #ffffff; border-color: #cbd5e1; color: #0f172a; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03); }

        html.dark .custom-input { background-color: #0f1424; border-color: #232d47; color: #ffffff; }
        html:not(.dark) .custom-input { background-color: #f1f5f9; border-color: #cbd5e1; color: #0f172a; }

        .hide-scrollbar::-webkit-scrollbar { display: none; }
    </style>
</head>
<body class="min-h-screen flex flex-col justify-between pb-24 select-none">

    <!-- AUTHENTICATION OVERLAY -->
    <div id="authOverlay" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 hidden">
        <div class="custom-card border rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl space-y-5">
            <div class="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-violet-600 via-purple-600 to-pink-500 flex items-center justify-center text-white text-3xl shadow-lg shadow-purple-500/30">
                <i class="fa-solid fa-heart"></i>
            </div>
            <div>
                <h2 class="text-2xl font-extrabold">Gewickelt</h2>
                <p class="text-[11px] text-app-textMuted mt-1 uppercase tracking-wider font-semibold">ABDL & FLR LIFESTYLE COMMUNITY (18+)</p>
            </div>
            <form id="loginForm" class="space-y-3 text-left" onsubmit="handleAuthLogin(event)">
                <div>
                    <label class="block text-[10px] font-semibold text-app-textMuted uppercase mb-1">E-Mail-Adresse</label>
                    <input type="email" id="loginEmail" required placeholder="name@beispiel.de" class="w-full px-4 py-2.5 rounded-xl border custom-input text-xs outline-none focus:border-app-accent">
                </div>
                <div>
                    <label class="block text-[10px] font-semibold text-app-textMuted uppercase mb-1">Benutzername</label>
                    <input type="text" id="loginUsername" required minlength="3" maxlength="24" placeholder="z. B. Keyholder_Lady" class="w-full px-4 py-2.5 rounded-xl border custom-input text-xs outline-none focus:border-app-accent">
                </div>
                <div>
                    <label class="block text-[10px] font-semibold text-app-textMuted uppercase mb-1">Passwort</label>
                    <input type="password" id="loginPassword" required minlength="6" placeholder="Mindestens 6 Zeichen" class="w-full px-4 py-2.5 rounded-xl border custom-input text-xs outline-none focus:border-app-accent">
                </div>
                <div>
                    <label class="block text-[10px] font-semibold text-app-textMuted uppercase mb-1">Hauptrolle</label>
                    <select id="loginRole" class="w-full px-4 py-2.5 rounded-xl border custom-input text-xs outline-none focus:border-app-accent">
                        <option value="👑 Keyholderin / FLR Führung">👑 Keyholderin / FLR Führung</option>
                        <option value="🔒 Devot / Unterlegen">🔒 Devot / Unterlegen</option>
                        <option value="👶 ABDL / Pflege & Erziehung">👶 ABDL / Pflege & Erziehung</option>
                        <option value="✨ Paar & Kombiniert">✨ Paar & Kombiniert</option>
                    </select>
                </div>
                <div class="flex items-center gap-2 pt-1">
                    <input type="checkbox" id="rememberMe" checked class="rounded custom-input text-app-accent">
                    <label for="rememberMe" class="text-[11px] text-app-textMuted">Angemeldet bleiben</label>
                </div>
                <div class="flex items-center gap-2">
                    <input type="checkbox" id="ageConfirm" required class="rounded custom-input text-app-accent">
                    <label for="ageConfirm" class="text-[11px] text-app-textMuted">Ich bin mindestens 18 Jahre alt.</label>
                </div>
                <button type="submit" class="w-full py-3 bg-gradient-to-r from-violet-600 to-pink-500 text-white font-bold rounded-xl text-xs shadow-lg hover:opacity-95 transition">
                    Einloggen & Starten <i class="fa-solid fa-arrow-right ml-1"></i>
                </button>
            </form>
        </div>
    </div>

    <!-- MAIN APP STRUCTURE -->
    <div id="mainApp" class="flex-1 max-w-lg mx-auto w-full flex flex-col">
        <header class="sticky top-0 z-40 backdrop-blur-md px-4 py-3 border-b flex items-center justify-between transition custom-card">
            <div class="flex items-center gap-3">
                <button onclick="toggleSideMenu()" class="text-lg p-1"><i class="fa-solid fa-bars"></i></button>
                <div class="flex items-center gap-2.5">
                    <div class="w-9 h-9 rounded-xl overflow-hidden shadow-md border border-violet-500/30 flex items-center justify-center bg-white">
                        <img id="appHeaderLogo" src="https://i.ibb.co/L8mY8p8/gewickelt-logo.png" class="w-full h-full object-cover" alt="Logo">
                    </div>
                    <div>
                        <h1 class="text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400 leading-tight">Gewickelt</h1>
                        <p class="text-[9px] font-semibold tracking-wider text-app-textMuted uppercase" id="headerUserRole">ONLINE APP</p>
                    </div>
                </div>
            </div>
            <span class="text-[10px] text-emerald-500 font-semibold"><i class="fa-solid fa-signal mr-1"></i>Aktiv</span>
        </header>

        <main class="flex-1 p-4 space-y-4">
            <!-- FORUM / STARTSEITE -->
            <div id="view-forum" class="space-y-4">
                <div class="custom-card border rounded-3xl p-5 space-y-4 shadow-xl bg-gradient-to-br from-violet-900/10 via-transparent to-pink-900/10 border-violet-500/30">
                    <h2 class="text-base font-extrabold" id="welcomeUserTitle">Herzlich willkommen!</h2>
                    <p class="text-xs text-app-textMuted leading-relaxed">Genieße den sicheren Austausch, verwalte deine FLR-Protokolle oder stimme dich mit deiner Community ab.</p>
                </div>

                <div class="flex items-center gap-2 overflow-x-auto hide-scrollbar py-1">
                    <button onclick="filterCategory('Alle')" id="cat-Alle" class="px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap bg-app-accent text-white">Alle</button>
                    <button onclick="filterCategory('FLR')" id="cat-FLR" class="px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap custom-card border">👑 FLR</button>
                    <button onclick="filterCategory('Windeldisziplinierung')" id="cat-Windeldisziplinierung" class="px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap custom-card border">👶 Windeldisziplinierung</button>
                </div>

                <div class="custom-card border rounded-2xl p-4 space-y-3 shadow-lg">
                    <textarea id="newPostContent" rows="2" placeholder="Was gibt es Neues in deinem Lifestyle?" class="w-full custom-input border rounded-xl p-3 text-xs placeholder-app-textMuted outline-none resize-none focus:border-app-accent"></textarea>
                    
                    <div id="postImagePreviewContainer" class="hidden relative w-24 h-24 rounded-xl overflow-hidden border custom-input">
                        <img id="postImagePreview" src="" class="w-full h-full object-cover">
                        <button onclick="removePostImage()" class="absolute top-1 right-1 w-5 h-5 bg-black/70 hover:bg-rose-600 text-white rounded-full flex items-center justify-center text-[9px] transition"><i class="fa-solid fa-xmark"></i></button>
                    </div>

                    <div class="flex items-center justify-between pt-1 border-t border-app-textMuted/20">
                        <div class="flex items-center gap-2">
                            <select id="newPostCategory" class="custom-input border rounded-xl px-2.5 py-1.5 text-xs outline-none focus:border-app-accent">
                                <option value="FLR">👑 FLR</option>
                                <option value="Windeldisziplinierung">👶 Windeldisziplinierung</option>
                                <option value="Lifestyle">✨ Lifestyle</option>
                            </select>
                            <label class="px-3 py-1.5 custom-input border hover:border-app-accent rounded-xl text-xs font-semibold cursor-pointer transition flex items-center gap-1.5">
                                <i class="fa-solid fa-image text-pink-500"></i> Bild
                                <input type="file" accept="image/*" class="hidden" onchange="handlePostImageUpload(event)">
                            </label>
                        </div>
                        <button onclick="createPost()" class="px-4 py-2 bg-gradient-to-r from-violet-600 to-pink-500 hover:opacity-95 text-white font-semibold rounded-xl text-xs shadow-md transition">
                            Veröffentlichen
                        </button>
                    </div>
                </div>

                <div id="postsFeed" class="space-y-3">
                    <p class="text-center text-xs text-app-textMuted py-4">Lade Beiträge...</p>
                </div>
            </div>

            <!-- CHAT -->
            <div id="view-chat" class="hidden space-y-4">
                <div class="custom-card border rounded-2xl p-4 space-y-3 shadow-lg">
                    <div class="flex justify-between items-center border-b border-app-textMuted/20 pb-2">
                        <h3 class="text-xs font-bold"><i class="fa-solid fa-comments text-violet-500 mr-1.5"></i> Öffentlicher Community-Chatroom</h3>
                        <span class="text-[9px] px-2 py-0.5 bg-emerald-500/20 text-emerald-500 rounded-full font-semibold">Live</span>
                    </div>
                    <div id="publicChatList" class="space-y-2.5 h-64 overflow-y-auto pr-1">
                        <p class="text-[10px] text-app-textMuted text-center py-4">Lade öffentliche Nachrichten...</p>
                    </div>
                    <div class="pt-2 border-t border-app-textMuted/20 flex gap-2">
                        <input type="text" id="publicChatInput" onkeydown="if(event.key === 'Enter') sendPublicMessage()" placeholder="Öffentliche Nachricht schreiben..." class="flex-1 custom-input border rounded-xl px-3 py-2 text-xs placeholder-app-textMuted outline-none focus:border-app-accent">
                        <button onclick="sendPublicMessage()" class="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl text-xs transition">
                            <i class="fa-solid fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>

            <!-- FLR TOOLS -->
            <div id="view-flr" class="hidden space-y-4">
                <div class="custom-card border rounded-2xl p-4 space-y-4 shadow-lg">
                    <h3 class="text-xs font-bold"><i class="fa-solid fa-dharmachakra text-violet-500 mr-1.5"></i> FLR Glücksrad der Aufgaben</h3>
                    <div id="wheelResultBox" class="p-3 bg-violet-600/10 border border-violet-500/30 rounded-xl text-xs font-semibold min-h-[44px] flex items-center justify-center text-slate-200">
                        Klicke zum Drehen für eine zufällige Aufgabe!
                    </div>
                    <button onclick="spinWheelOfFortune()" class="w-full py-2 bg-gradient-to-r from-violet-600 to-pink-500 text-white rounded-xl text-xs font-bold shadow-md transition">
                        Glücksrad drehen 🎡
                    </button>
                </div>
            </div>

            <!-- PROFIL -->
            <div id="view-profile" class="hidden space-y-4">
                <div class="custom-card border rounded-2xl p-4 space-y-3 shadow-lg">
                    <h3 id="profileDisplayName" class="text-sm font-bold">Benutzer</h3>
                    <p id="profileDisplayEmail" class="text-[11px] text-app-textMuted">email@beispiel.de</p>
                </div>
            </div>
        </main>

        <!-- BOTTOM NAVIGATION -->
        <nav class="fixed bottom-0 left-0 right-0 backdrop-blur-md border-t px-2 py-2.5 flex justify-around items-center z-40 max-w-lg mx-auto custom-card">
            <button onclick="switchTab('forum')" id="nav-forum" class="flex flex-col items-center gap-1 text-app-accent"><i class="fa-solid fa-comments text-lg"></i><span class="text-[9px] font-semibold">Forum</span></button>
            <button onclick="switchTab('chat')" id="nav-chat" class="flex flex-col items-center gap-1 text-app-textMuted hover:text-app-accent"><i class="fa-solid fa-paper-plane text-lg"></i><span class="text-[9px] font-semibold">Chat</span></button>
            <button onclick="switchTab('flr')" id="nav-flr" class="flex flex-col items-center gap-1 text-app-textMuted hover:text-app-accent"><i class="fa-solid fa-crown text-lg"></i><span class="text-[9px] font-semibold">FLR</span></button>
            <button onclick="switchTab('profile')" id="nav-profile" class="flex flex-col items-center gap-1 text-app-textMuted hover:text-app-accent"><i class="fa-solid fa-user text-lg"></i><span class="text-[9px] font-semibold">Profil</span></button>
        </nav>
    </div>

    <!-- SIDE DRAWER -->
    <div id="sideMenu" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm hidden flex">
        <div class="w-72 custom-card h-full p-5 flex flex-col justify-between border-r">
            <div class="space-y-4">
                <div class="flex justify-between items-center pb-3 border-b border-app-textMuted/20">
                    <span class="font-bold text-sm">Navigation</span>
                    <button onclick="toggleSideMenu()"><i class="fa-solid fa-xmark text-base"></i></button>
                </div>
                <button onclick="logoutUser()" class="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-rose-500 hover:bg-rose-500/10 transition"><i class="fa-solid fa-right-from-bracket mr-2"></i> Abmelden</button>
            </div>
        </div>
        <div class="flex-1" onclick="toggleSideMenu()"></div>
    </div>

    <script>
        const API_URL = 'https://gewickelt-server-1.onrender.com/api/posts';
        const PUBLIC_CHAT_API_URL = 'https://gewickelt-server-1.onrender.com/api/chat';
        
        let currentUser = { email: '', username: '', role: '' };
        let currentFilter = 'Alle';
        let allServerPosts = [];
        let currentPostImage = null;

        document.addEventListener('DOMContentLoaded', () => {
            const savedUser = localStorage.getItem('gewickelt_session_user');
            if (savedUser) {
                try {
                    currentUser = JSON.parse(savedUser);
                    initAppSession();
                } catch (e) {
                    document.getElementById('authOverlay').classList.remove('hidden');
                }
            } else {
                document.getElementById('authOverlay').classList.remove('hidden');
            }
        });

        function handleAuthLogin(e) {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value.trim();
            const username = document.getElementById('loginUsername').value.trim();
            const role = document.getElementById('loginRole').value;

            if (username && email) {
                currentUser = { email, username, role };
                localStorage.setItem('gewickelt_session_user', JSON.stringify(currentUser));
                document.getElementById('authOverlay').classList.add('hidden');
                initAppSession();
            }
        }

        function initAppSession() {
            document.getElementById('headerUserRole').innerText = currentUser.role;
            document.getElementById('profileDisplayName').innerText = currentUser.username;
            document.getElementById('profileDisplayEmail').innerText = currentUser.email;
            document.getElementById('welcomeUserTitle').innerText = `Herzlich willkommen zurück, ${currentUser.username}!`;
            loadPosts();
        }

        function logoutUser() {
            localStorage.removeItem('gewickelt_session_user');
            location.reload();
        }

        function switchTab(tabId) {
            ['forum', 'chat', 'flr', 'profile'].forEach(id => {
                const view = document.getElementById('view-' + id);
                const btn = document.getElementById('nav-' + id);
                if (view) view.classList.toggle('hidden', id !== tabId);
                if (btn) btn.className = id === tabId ? "flex flex-col items-center gap-1 text-app-accent" : "flex flex-col items-center gap-1 text-app-textMuted hover:text-app-accent";
            });
            if (tabId === 'chat') loadPublicChatMessages();
        }

        function toggleSideMenu() {
            document.getElementById('sideMenu').classList.toggle('hidden');
        }

        async function loadPosts() {
            const feed = document.getElementById('postsFeed');
            try {
                const res = await fetch(API_URL);
                allServerPosts = await res.json();
                
                // Lokale Likes und Kommentare mit einbeziehen, damit sie sofort reibungslos da sind
                const savedLocal = localStorage.getItem('gewickelt_local_posts_' + currentUser.username);
                if (savedLocal) {
                    const localPosts = JSON.parse(savedLocal);
                    allServerPosts = allServerPosts.map(serverPost => {
                        const foundLocal = localPosts.find(lp => (lp.id || lp._id) === (serverPost.id || serverPost._id));
                        return foundLocal ? foundLocal : serverPost;
                    });
                }
                renderFilteredPosts();
            } catch (err) {
                feed.innerHTML = '<p class="text-center text-xs text-rose-500 py-4">Verbindung wird geladen...</p>';
            }
        }

        function renderFilteredPosts() {
            const feed = document.getElementById('postsFeed');
            let filtered = currentFilter === 'Alle' ? allServerPosts : allServerPosts.filter(p => p.category === currentFilter);

            if (!filtered.length) {
                feed.innerHTML = '<p class="text-center text-xs text-app-textMuted py-4">Noch keine Beiträge vorhanden.</p>';
                return;
            }

            feed.innerHTML = filtered.map(p => {
                const postId = p.id || p._id;
                const likes = p.likes || [];
                const hasLiked = likes.includes(currentUser.username);
                const comments = p.comments || [];

                return `
                    <div class="custom-card border rounded-2xl p-4 space-y-3 shadow-md">
                        <div class="flex items-center justify-between">
                            <h4 class="text-xs font-bold">${p.username || 'Anonym'}</h4>
                            <span class="px-2 py-0.5 bg-purple-500/10 text-purple-500 rounded text-[9px]">${p.category || 'Allgemein'}</span>
                        </div>
                        ${p.content ? `<p class="text-xs">${p.content}</p>` : ''}
                        ${p.image ? `<div class="rounded-xl overflow-hidden border custom-input max-h-72"><img src="${p.image}" class="w-full h-full object-cover"></div>` : ''}

                        <!-- LIKE & KOMMENTAR LEISTE -->
                        <div class="flex items-center gap-4 pt-2 border-t border-app-textMuted/20 text-xs">
                            <button onclick="toggleLike('${postId}')" class="flex items-center gap-1.5 ${hasLiked ? 'text-pink-500 font-bold' : 'text-app-textMuted hover:text-pink-500'} transition">
                                <i class="${hasLiked ? 'fa-solid' : 'fa-regular'} fa-heart text-sm"></i>
                                <span>${likes.length}</span>
                            </button>
                            <div class="flex items-center gap-1.5 text-app-textMuted">
                                <i class="fa-regular fa-comment text-sm"></i>
                                <span>${comments.length} Kommentare</span>
                            </div>
                        </div>

                        <!-- KOMMENTAR BEREICH -->
                        <div class="space-y-2 pt-2 border-t border-app-textMuted/10">
                            <div class="space-y-1.5 max-h-40 overflow-y-auto">
                                ${comments.length === 0 ? '<p class="text-[10px] text-app-textMuted">Noch keine Kommentare.</p>' : 
                                  comments.map(c => `
                                    <div class="custom-input border rounded-xl p-2 text-[11px] space-y-0.5">
                                        <div class="flex justify-between items-center text-[9px] text-app-textMuted font-bold">
                                            <span class="text-violet-500">${c.username}</span>
                                            <span>${c.date || ''}</span>
                                        </div>
                                        <p>${c.text}</p>
                                    </div>
                                  `).join('')}
                            </div>
                            <div class="flex gap-2 pt-1">
                                <input type="text" id="commentInput_${postId}" onkeydown="if(event.key === 'Enter') addComment('${postId}')" placeholder="Kommentar schreiben..." class="flex-1 custom-input border rounded-xl px-3 py-1.5 text-xs outline-none focus:border-app-accent">
                                <button onclick="addComment('${postId}')" class="px-3 py-1.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-xs font-semibold transition">
                                    <i class="fa-solid fa-paper-plane"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        }

        // Like lokal und auf dem Server speichern
        async function toggleLike(postId) {
            let post = allServerPosts.find(p => (p.id || p._id) === postId);
            if (!post) return;

            if (!post.likes) post.likes = [];
            const index = post.likes.indexOf(currentUser.username);
            
            if (index > -1) {
                post.likes.splice(index, 1); // Unlike
            } else {
                post.likes.push(currentUser.username); // Like
            }

            // Sofort lokal sichern & UI aktualisieren (macht das Herz sofort rot)
            localStorage.setItem('gewickelt_local_posts_' + currentUser.username, JSON.stringify(allServerPosts));
            renderFilteredPosts();

            try {
                await fetch(`${API_URL}/${postId}/like`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: currentUser.username })
                });
            } catch (err) {
                console.error("Like Server-Sync Fehler", err);
            }
        }

        // Kommentar hinzufügen und sofort anzeigen
        async function addComment(postId) {
            const input = document.getElementById(`commentInput_${postId}`);
            if (!input) return;
            const text = input.value.trim();
            if (!text) return;

            let post = allServerPosts.find(p => (p.id || p._id) === postId);
            if (!post) return;

            if (!post.comments) post.comments = [];
            const newComment = {
                username: currentUser.username,
                text: text,
                date: new Date().toLocaleDateString('de-DE') + ' ' + new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
            };

            post.comments.push(newComment);
            input.value = '';

            // Sofort lokal sichern & UI aktualisieren
            localStorage.setItem('gewickelt_local_posts_' + currentUser.username, JSON.stringify(allServerPosts));
            renderFilteredPosts();

            try {
                await fetch(`${API_URL}/${postId}/comment`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newComment)
                });
            } catch (err) {
                console.error("Kommentar Server-Sync Fehler", err);
            }
        }

        async function createPost() {
            const content = document.getElementById('newPostContent').value.trim();
            const category = document.getElementById('newPostCategory').value;
            
            if (!content && !currentPostImage) return;

            try {
                await fetch(API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        username: currentUser.username,
                        category: category,
                        content: content,
                        image: currentPostImage || null,
                        likes: [],
                        comments: []
                    })
                });
                document.getElementById('newPostContent').value = '';
                currentPostImage = null;
                document.getElementById('postImagePreviewContainer').classList.add('hidden');
                loadPosts();
            } catch (err) {
                alert('Fehler beim Speichern.');
            }
        }

        function handlePostImageUpload(event) {
            const file = event.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = function(e) {
                currentPostImage = e.target.result;
                document.getElementById('postImagePreview').src = currentPostImage;
                document.getElementById('postImagePreviewContainer').classList.remove('hidden');
            };
            reader.readAsDataURL(file);
        }

        function removePostImage() {
            currentPostImage = null;
            document.getElementById('postImagePreviewContainer').classList.add('hidden');
        }

        function filterCategory(cat) {
            currentFilter = cat;
            ['Alle', 'FLR', 'Windeldisziplinierung'].forEach(c => {
                const btn = document.getElementById('cat-' + c);
                if (btn) btn.className = c === cat ? "px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap bg-app-accent text-white" : "px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap custom-card border";
            });
            renderFilteredPosts();
        }

        function spinWheelOfFortune() {
            const wheelTasks = ["👑 24 Stunden absolute Unterwürfigkeit", "📝 15 Zeilen Loyalitätsschwur schreiben", "🧹 Sämtliche Aufgaben im Haushalt erledigen"];
            document.getElementById('wheelResultBox').innerText = wheelTasks[Math.floor(Math.random() * wheelTasks.length)];
        }

        async function loadPublicChatMessages() {
            const list = document.getElementById('publicChatList');
            try {
                const res = await fetch(PUBLIC_CHAT_API_URL);
                const messages = await res.json();
                if (!messages.length) {
                    list.innerHTML = '<p class="text-[10px] text-app-textMuted text-center py-4">Noch keine Nachrichten.</p>';
                    return;
                }
                list.innerHTML = messages.map(m => `<div class="p-2 custom-input border rounded-xl text-xs"><strong>${m.username}:</strong> ${m.text}</div>`).join('');
            } catch (e) {}
        }

        async function sendPublicMessage() {
            const input = document.getElementById('publicChatInput');
            const text = input.value.trim();
            if (!text) return;
            await fetch(PUBLIC_CHAT_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: currentUser.username, text })
            });
            input.value = '';
            loadPublicChatMessages();
        }
    </script>
</body>
</html>

                                                                                                                                                                                                                                                                                                                                                               const Post = mongoose.model('Post', postSchema);

                                                                                                                                                                                                                                                                                                                                                               // Alle Beiträge abrufen
                                                                                                                                                                                                                                                                                                                                                               app.get('/api/posts', async (req, res) => {
                                                                                                                                                                                                                                                                                                                                                                   try {
                                                                                                                                                                                                                                                                                                                                                                           const posts = await Post.find().sort({ createdAt: -1 });
                                                                                                                                                                                                                                                                                                                                                                                   res.status(200).json(posts);
                                                                                                                                                                                                                                                                                                                                                                                       } catch (err) {
                                                                                                                                                                                                                                                                                                                                                                                               res.status(500).json({ error: 'Fehler beim Laden der Beiträge' });
                                                                                                                                                                                                                                                                                                                                                                                                   }
                                                                                                                                                                                                                                                                                                                                                                                                   });

                                                                                                                                                                                                                                                                                                                                                                                                   // Neuen Beitrag erstellen
                                                                                                                                                                                                                                                                                                                                                                                                   app.post('/api/posts', async (req, res) => {
                                                                                                                                                                                                                                                                                                                                                                                                       try {
                                                                                                                                                                                                                                                                                                                                                                                                               const { username, category, content, image, likes, comments } = req.body;
                                                                                                                                                                                                                                                                                                                                                                                                                       const newPost = new Post({
                                                                                                                                                                                                                                                                                                                                                                                                                                   username,
                                                                                                                                                                                                                                                                                                                                                                                                                                               category,
                                                                                                                                                                                                                                                                                                                                                                                                                                                           content,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                       image,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   likes: likes || [],
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               comments: comments || []
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               await newPost.save();
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       res.status(201).json(newPost);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           } catch (err) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   res.status(500).json({ error: 'Fehler beim Erstellen des Beitrags' });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       });

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       // Beitrag löschen
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       app.delete('/api/posts/:id', async (req, res) => {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           try {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   await Post.findByIdAndDelete(req.params.id);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           res.status(200).json({ message: 'Beitrag gelöscht' });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               } catch (err) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       res.status(500).json({ error: 'Fehler beim Löschen des Beitrags' });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           });

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           // Like hinzufügen oder entfernen (Toggle)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           app.post('/api/posts/:id/like', async (req, res) => {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               try {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       const { username } = req.body;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               const post = await Post.findById(req.params.id);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               if (!post) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           return res.status(404).json({ error: 'Beitrag nicht gefunden' });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   }

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           if (!post.likes) post.likes = [];
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   const index = post.likes.indexOf(username);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           if (index > -1) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       post.likes.splice(index, 1); // Unlike
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               } else {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           post.likes.push(username); // Like
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   }

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           await post.save();
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   res.status(200).json(post);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       } catch (err) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               console.error(err);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       res.status(500).json({ error: 'Serverfehler beim Liken' });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           });

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           // Kommentar zu einem Beitrag hinzufügen
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           app.post('/api/posts/:id/comment', async (req, res) => {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               try {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       const { username, text, date } = req.body;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               const post = await Post.findById(req.params.id);

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       if (!post) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   return res.status(404).json({ error: 'Beitrag nicht gefunden' });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           }

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   if (!post.comments) post.comments = [];
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           const newComment = { username, text, date: date || new Date().toLocaleString() };
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   post.comments.push(newComment);

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           await post.save();
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   res.status(200).json(post);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       } catch (err) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               console.error(err);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       res.status(500).json({ error: 'Serverfehler beim Kommentieren' });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           });

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           const PORT = process.env.PORT || 3000;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           app.listen(PORT, () => {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               console.log(`Server läuft auf Port ${PORT}`);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
