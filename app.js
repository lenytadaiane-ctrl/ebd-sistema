const { useState, useEffect } = React;

// Ícones SVG
const Icons = {
  Calendar: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  Users: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  Book: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  FileText: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  DollarSign: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  UserX: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6" />
    </svg>
  ),
  Eye: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ),
  Save: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
    </svg>
  ),
  BarChart3: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  Download: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  ),
  Filter: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
    </svg>
  ),
  RefreshCw: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  )
};

const EBDApp = () => {
  const scriptUrl = 'https://script.google.com/macros/s/AKfycbzjg-8O1MqANXvt6wQOcajXnChHFNl-e1aahRj1X8j12TeqOKHzoSK2VwEM1pKdk1IB/exec';
  
  const [userType, setUserType] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [password, setPassword] = useState('');
  const [view, setView] = useState('attendance');
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [syncStatus, setSyncStatus] = useState('');

  const [classes] = useState({
    adultos: {
      name: 'Adultos',
      password: 'adultos123',
      students: ['Miss Irenilda', 'Jhon', 'Geisiely']
    },
    jovens: {
      name: 'Jovens',
      password: 'jovens123',
      students: ['Pb Antônio', 'Murilo', 'Natanael']
    }
  });

  const [attendance, setAttendance] = useState({});
  const [records, setRecords] = useState({});

  const loadFromCloud = async () => {
    setLoading(true);
    setSyncStatus('Carregando...');
    try {
      const response = await fetch(scriptUrl + '?action=getRecords');
      const data = await response.json();
      setRecords(data || {});
      setSyncStatus('Sincronizado');
      setTimeout(() => setSyncStatus(''), 2000);
    } catch (error) {
      console.error('Erro:', error);
      setSyncStatus('Erro');
    }
    setLoading(false);
  };

  useEffect(() => {
    loadFromCloud();
  }, []);

  const handleLogin = (type, classKey = null) => {
    if (type === 'master') {
      if (password === 'coordenador2025') {
        setUserType('master');
        setPassword('');
      } else {
        alert('Senha incorreta!');
      }
    } else {
      if (password === classes[classKey].password) {
        setUserType('teacher');
        setSelectedClass(classKey);
        setPassword('');
      } else {
        alert('Senha incorreta!');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <Icons.Book className="w-16 h-16 mx-auto text-indigo-600 mb-4" />
          <h1 className="text-3xl font-bold text-gray-800">Sistema EBD</h1>
          <p className="text-gray-600 mt-2">Escola Bíblica Dominical</p>
          {syncStatus && <p className="text-sm mt-2 text-indigo-600">{syncStatus}</p>}
        </div>

        {!userType ? (
          <div className="space-y-4">
            <button
              onClick={() => setUserType('master-login')}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2"
            >
              <Icons.Eye />
              Acesso Coordenador
            </button>

            <div className="space-y-2">
              <p className="text-sm text-gray-600 font-medium">Acesso Professor:</p>
              {Object.entries(classes).map(([key, cls]) => (
                <button
                  key={key}
                  onClick={() => setUserType('teacher-' + key)}
                  className="w-full bg-gray-100 text-gray-800 py-2 rounded-lg hover:bg-gray-200 transition"
                >
                  {cls.name}
                </button>
              ))}
            </div>

            <button
              onClick={loadFromCloud}
              disabled={loading}
              className="w-full mt-4 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition flex items-center justify-center gap-2"
            >
              <Icons.RefreshCw className={loading ? 'animate-spin' : ''} />
              {loading ? 'Sincronizando...' : 'Atualizar Dados'}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <input
              type="password"
              placeholder="Digite a senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
            <button
              onClick={() => handleLogin(userType === 'master-login' ? 'master' : 'teacher', selectedClass)}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700"
            >
              Entrar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

ReactDOM.render(<EBDApp />, document.getElementById('root'));
```

---

## 🚀 **Agora siga estes passos:**

### **Passo 1: Criar conta no GitHub**
1. Acesse: https://github.com
2. Clique em "Sign up"
3. Crie sua conta

### **Passo 2: Criar repositório**
1. Faça login no GitHub
2. Clique no botão verde **"New"** (ou ícone +)
3. Nome do repositório: `ebd-sistema`
4. Marque **"Public"**
5. Marque **"Add a README file"**
6. Clique em **"Create repository"**

### **Passo 3: Fazer upload dos arquivos**
1. No repositório criado, clique em **"Add file"** > **"Upload files"**
2. Arraste os arquivos `index.html` e `app.js`
3. Clique em **"Commit changes"**

### **Passo 4: Ativar GitHub Pages**
1. No repositório, clique em **"Settings"**
2. No menu lateral, clique em **"Pages"**
3. Em **"Source"**, selecione **"main"** branch
4. Clique em **"Save"**
5. Aguarde 1-2 minutos

### **Passo 5: Pegar o link**
Seu site estará em:
```
https://SEU-USUARIO.github.io/ebd-sistema
