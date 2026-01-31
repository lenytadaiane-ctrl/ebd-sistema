const { useState, useEffect } = React;

const Book = () => <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>;

const Users = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;

const Save = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>;

const RefreshCw = ({ spin }) => <svg className={'w-5 h-5 ' + (spin ? 'animate-spin' : '')} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>;

const EBDApp = () => {
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx4PZSJY2Xr3sXWLhuxK2lN6TGfYoy0XJaqL2YJM6-EJ9M_5QCvN73oCvbPuaKE2AKw/exec';
  
  const [userType, setUserType] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [password, setPassword] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const classes = {
    adultos: { name: 'Adultos', password: 'adultos123', students: ['Miss Irenilda', 'Jhon', 'Geisiely', 'Geraldinho', 'Dc Evandro'] },
    jovens: { name: 'Jovens', password: 'jovens123', students: ['Pb Antônio', 'Murilo', 'Natanael', 'Zaine', 'Leo'] }
  };

  const [attendance, setAttendance] = useState({});
  const [records, setRecords] = useState({});

  const loadRecords = async () => {
    setLoading(true);
    setStatus('Carregando...');
    try {
      const res = await fetch(SCRIPT_URL + '?action=getRecords');
      const data = await res.json();
      setRecords(data || {});
      setStatus('Sincronizado! ✓');
      setTimeout(() => setStatus(''), 2000);
    } catch (err) {
      setStatus('Erro ao carregar');
      console.error(err);
    }
    setLoading(false);
  };

  const saveToCloud = async (key, value) => {
    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify({ key, value })
      });
      setStatus('Salvo na nuvem! ✓');
      setTimeout(() => setStatus(''), 2000);
    } catch (err) {
      setStatus('Erro ao salvar');
      console.error(err);
    }
  };

  useEffect(() => { loadRecords(); }, []);

  const getKey = (cls, date) => cls + '_' + date;

  const getData = (cls, date) => {
    const key = getKey(cls, date);
    return attendance[key] || { present: [], bibles: 0, magazines: 0, visitors: 0, offerPix: 0, offerCash: 0 };
  };

  const updateData = (cls, date, data) => {
    setAttendance(prev => ({ ...prev, [getKey(cls, date)]: data }));
  };

  const togglePresence = (cls, date, student) => {
    const data = getData(cls, date);
    const present = data.present.includes(student) 
      ? data.present.filter(s => s !== student)
      : [...data.present, student];
    updateData(cls, date, { ...data, present });
  };

  const updateField = (cls, date, field, value) => {
    const data = getData(cls, date);
    updateData(cls, date, { ...data, [field]: value });
  };

  const saveRecord = async (cls, date) => {
    const data = getData(cls, date);
    if (data.present.length === 0) {
      alert('Marque pelo menos 1 aluno presente!');
      return;
    }
    
    const key = getKey(cls, date);
    const value = { ...data, className: classes[cls].name, date, savedAt: new Date().toISOString() };
    
    setRecords(prev => ({ ...prev, [key]: value }));
    setStatus('Salvando...');
    await saveToCloud(key, value);
    alert('Registro salvo com sucesso!');
  };

  const handleLogin = (type, cls = null) => {
    if (type === 'master') {
      if (password === 'coordenador2025') {
        setUserType('master');
        setPassword('');
      } else {
        alert('Senha incorreta!');
      }
    } else {
      if (password === classes[cls].password) {
        setUserType('teacher');
        setSelectedClass(cls);
        setPassword('');
      } else {
        alert('Senha incorreta!');
      }
    }
  };

  if (!userType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <Book />
            <h1 className="text-3xl font-bold text-gray-800 mt-4">Sistema EBD</h1>
            <p className="text-gray-600 mt-2">Escola Bíblica Dominical</p>
            {status && <p className="text-sm mt-2 text-indigo-600">{status}</p>}
          </div>

          <div className="space-y-4">
            <button onClick={() => setUserType('master-login')} className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition">
              👨‍💼 Acesso Coordenador
            </button>

            <div className="border-t pt-4">
              <p className="text-sm text-gray-600 font-medium mb-2">Acesso Professor:</p>
              {Object.entries(classes).map(([key, cls]) => (
                <button key={key} onClick={() => setUserType('teacher-' + key)} className="w-full bg-gray-100 text-gray-800 py-2 rounded-lg hover:bg-gray-200 transition mb-2">
                  {cls.name}
                </button>
              ))}
            </div>

            <button onClick={loadRecords} disabled={loading} className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition flex items-center justify-center gap-2">
              <RefreshCw spin={loading} />
              {loading ? 'Sincronizando...' : 'Atualizar Dados'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (userType.includes('login') || userType.includes('teacher-')) {
    const isMaster = userType === 'master-login';
    const cls = userType.replace('teacher-', '');
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            {isMaster ? 'Acesso Coordenador' : classes[cls].name}
          </h2>
          
          <div className="space-y-4">
            <input
              type="password"
              placeholder="Digite a senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin(isMaster ? 'master' : 'teacher', cls)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
            
            <div className="flex gap-2">
              <button onClick={() => handleLogin(isMaster ? 'master' : 'teacher', cls)} className="flex-1 bg-indigo-600 text-white py-3 rounded-lg">
                Entrar
              </button>
              <button onClick={() => { setUserType(null); setPassword(''); }} className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg">
                Voltar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isTeacher = userType === 'teacher';
  const classData = classes[selectedClass];
  const data = getData(selectedClass, currentDate);

  if (isTeacher) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow p-4 mb-4 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-800">{classData.name}</h1>
              <input type="date" value={currentDate} onChange={(e) => setCurrentDate(e.target.value)} className="mt-2 px-3 py-2 border rounded" />
            </div>
            <button onClick={() => setUserType(null)} className="px-4 py-2 bg-red-100 text-red-700 rounded">Sair</button>
          </div>

          {status && <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 text-center text-blue-800">{status}</div>}

          <div className="bg-white rounded-lg shadow p-6 mb-4">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Users /> Chamada - {classData.students.length} Alunos
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {classData.students.map(student => (
                <button
                  key={student}
                  onClick={() => togglePresence(selectedClass, currentDate, student)}
                  className={'p-3 rounded-lg border-2 transition text-left ' + (data.present.includes(student) ? 'bg-green-50 border-green-500' : 'bg-gray-50 border-gray-300')}
                >
                  <span className={'inline-block w-4 h-4 rounded-full mr-2 ' + (data.present.includes(student) ? 'bg-green-500' : 'bg-gray-300')} />
                  {student}
                </button>
              ))}
            </div>
            <p className="mt-4 text-sm text-gray-600">
              Presentes: <strong className="text-indigo-600">{data.present.length}</strong> de {classData.students.length}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-white rounded-lg shadow p-4">
              <label className="block text-sm font-medium mb-2">Bíblias</label>
              <input type="number" min="0" value={data.bibles} onChange={(e) => updateField(selectedClass, currentDate, 'bibles', e.target.value)} className="w-full px-3 py-2 border rounded" />
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <label className="block text-sm font-medium mb-2">Revistas</label>
              <input type="number" min="0" value={data.magazines} onChange={(e) => updateField(selectedClass, currentDate, 'magazines', e.target.value)} className="w-full px-3 py-2 border rounded" />
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <label className="block text-sm font-medium mb-2">Visitantes</label>
              <input type="number" min="0" value={data.visitors} onChange={(e) => updateField(selectedClass, currentDate, 'visitors', e.target.value)} className="w-full px-3 py-2 border rounded" />
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <label className="block text-sm font-medium mb-2">Oferta PIX (R$)</label>
              <input type="number" min="0" step="0.01" value={data.offerPix} onChange={(e) => updateField(selectedClass, currentDate, 'offerPix', e.target.value)} className="w-full px-3 py-2 border rounded" />
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <label className="block text-sm font-medium mb-2">Oferta Dinheiro (R$)</label>
              <input type="number" min="0" step="0.01" value={data.offerCash} onChange={(e) => updateField(selectedClass, currentDate, 'offerCash', e.target.value)} className="w-full px-3 py-2 border rounded" />
            </div>
            <div className="bg-white rounded-lg shadow p-4 flex items-center justify-center">
              <div>
                <p className="text-sm text-gray-600">Total Ofertas:</p>
                <p className="text-2xl font-bold text-green-600">R$ {((Number(data.offerPix) || 0) + (Number(data.offerCash) || 0)).toFixed(2)}</p>
              </div>
            </div>
          </div>

          <button onClick={() => saveRecord(selectedClass, currentDate)} disabled={loading} className="w-full bg-indigo-600 text-white py-4 rounded-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2 font-semibold">
            <Save />
            {loading ? 'Salvando...' : 'Salvar Registro'}
          </button>
        </div>
      </div>
    );
  }

  // Coordenador
  const todayRecords = Object.entries(records).filter(([key]) => key.includes(currentDate));

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow p-4 mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Dashboard Coordenador</h1>
            <input type="date" value={currentDate} onChange={(e) => setCurrentDate(e.target.value)} className="mt-2 px-3 py-2 border rounded" />
          </div>
          <div className="flex gap-2">
            <button onClick={loadRecords} disabled={loading} className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded flex items-center gap-2">
              <RefreshCw spin={loading} />
              Atualizar
            </button>
            <button onClick={() => setUserType(null)} className="px-4 py-2 bg-red-100 text-red-700 rounded">Sair</button>
          </div>
        </div>

        {status && <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 text-center text-blue-800">{status}</div>}

        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-lg p-6 text-white mb-4">
          <h2 className="text-2xl font-bold mb-2">Relatório Geral</h2>
          <p>{new Date(currentDate + 'T00:00:00').toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
          {todayRecords.length > 0 && <p className="text-sm mt-2">{todayRecords.length} turma(s) com registro salvo</p>}
        </div>

        {todayRecords.length === 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <p className="text-yellow-800 text-sm">⚠️ Nenhum registro salvo para esta data.</p>
          </div>
        )}

        <div className="space-y-4">
          {Object.entries(classes).map(([key, cls]) => {
            const recordKey = key + '_' + currentDate;
            const record = records[recordKey];
            const isSaved = !!record;
            
            return (
              <div key={key} className={'bg-white rounded-lg shadow p-6 ' + (isSaved ? 'border-2 border-green-500' : '')}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold">{cls.name}</h3>
                    {isSaved && (
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full flex items-center gap-1">
                        <Save /> Salvo
                      </span>
                    )}
                  </div>
                </div>
                
                {isSaved ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Presentes</p>
                      <p className="font-bold">{record.present.length}/{cls.students.length}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Bíblias</p>
                      <p className="font-bold">{record.bibles}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Revistas</p>
                      <p className="font-bold">{record.magazines}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Ofertas</p>
                      <p className="font-bold text-green-600">R$ {((Number(record.offerPix) || 0) + (Number(record.offerCash) || 0)).toFixed(2)}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">Sem registro para esta data</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<EBDApp />, document.getElementById('root'));
