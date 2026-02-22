const { useState, useEffect } = React;

const Book = () => <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>;

const Users = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;

const Save = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>;

const RefreshCw = ({ spin }) => <svg className={'w-5 h-5 ' + (spin ? 'animate-spin' : '')} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>;

const Edit = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>;

const Trash = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;

const Plus = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>;

const EBDApp = () => {
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx4PZSJY2Xr3sXWLhuxK2lN6TGfYoy0XJaqL2YJM6-EJ9M_5QCvN73oCvbPuaKE2AKw/exec';
  
  const [userType, setUserType] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [password, setPassword] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [studentName, setStudentName] = useState('');
  const [editingRecord, setEditingRecord] = useState(null);

  const [classes, setClasses] = useState(() => {
    const saved = localStorage.getItem('ebd_classes');
    return saved ? JSON.parse(saved) : {
      adultos: {
        name: 'Adultos',
        password: 'adultos123',
        students: ['Miss Irenilda', 'Jhon', 'Geisiely', 'Geraldinho', 'Dc Evandro', 'Dza Eunice', 'Dc Aureliano', 'Dza Martina', 'Catarina', 'Pr. Marcinho', 'Dza Louise', 'Carlito', 'Pr Edilson', 'Miss. Daniela', 'Edson', 'Miss. Marlene', 'Pb. Rodival', 'Paula Denardi', 'Camila Denardi', 'Pra. Rosana', 'Pr. Narciso', 'Elisangela', 'Miss. Lúcia', 'Pb. Carlos', 'Pr. Vanderley', 'Dulcilene', 'Silvana', 'Bianca', 'Gisele', 'Ana Blanco', 'Izabel', 'Jorge Rodrigues']
      },
      preEscolar: {
        name: 'Pré-Escolar (3-5 anos)',
        password: 'pre123',
        students: ['Miguel (Ianca)', 'Miguel (Pr. Lourival)', 'Leonardo', 'Cecilia', 'Maria Alicia']
      },
      primarios: {
        name: 'Primários (6-8 anos)',
        password: 'primarios123',
        students: ['Othavio', 'Davi Luiz', 'Sofia', 'Emanuel', 'Mariana', 'Ruan']
      },
      teens: {
        name: 'Teens (9-11 anos)',
        password: 'teens123',
        students: ['Marcos Paulo', 'Arthur Rocha', 'Sarah', 'Valentina']
      },
      adolescentes: {
        name: 'Adolescentes (12-15 anos)',
        password: 'adolescentes123',
        students: ['Maria Eduarda', 'Paloma', 'Ana Julia', 'Isabela', 'Sarah', 'Salomao', 'Juliana', 'Emanuely', 'Júlia Vitória', 'Amanda Blanco', 'Maria Luiza']
      },
      jovens: {
        name: 'Jovens',
        password: 'jovens123',
        students: ['Pb Antônio', 'Dza Lenita', 'Henrique Santos', 'Murilo Aurélio', 'Ev Igor', 'Natanael', 'Zaine', 'Leo', 'Iana', 'Davi', 'Sara', 'Carlos', 'Ludmila', 'Evandro Jr', 'Rafael', 'Ana Dhessy', 'Inaê', 'Werika Santos', 'Felipe Rodrigo']
      }
    };
  });

  const [attendance, setAttendance] = useState({});
  const [records, setRecords] = useState({});

  useEffect(() => {
    localStorage.setItem('ebd_classes', JSON.stringify(classes));
  }, [classes]);

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
    return attendance[key] || { present: [], bibles: 0, magazines: 0, visitors: 0, offerPix: 0, offerCash: 0, teachersAbsent: 0, notes: '' };
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

  const addStudent = () => {
    if (!studentName.trim()) {
      alert('Digite um nome!');
      return;
    }
    setClasses(prev => ({
      ...prev,
      [selectedClass]: {
        ...prev[selectedClass],
        students: [...prev[selectedClass].students, studentName.trim()]
      }
    }));
    setStudentName('');
    setShowStudentModal(false);
    alert('Aluno adicionado!');
  };

  const updateStudent = () => {
    if (!studentName.trim()) {
      alert('Digite um nome!');
      return;
    }
    setClasses(prev => ({
      ...prev,
      [selectedClass]: {
        ...prev[selectedClass],
        students: prev[selectedClass].students.map(s => s === editingStudent ? studentName.trim() : s)
      }
    }));
    setStudentName('');
    setEditingStudent(null);
    setShowStudentModal(false);
    alert('Aluno atualizado!');
  };

  const deleteStudent = (student) => {
    if (!confirm('Remover ' + student + '?')) return;
    setClasses(prev => ({
      ...prev,
      [selectedClass]: {
        ...prev[selectedClass],
        students: prev[selectedClass].students.filter(s => s !== student)
      }
    }));
    alert('Aluno removido!');
  };

  const getTotals = (date) => {
    let totals = { present: 0, bibles: 0, magazines: 0, visitors: 0, offerPix: 0, offerCash: 0, teachersAbsent: 0 };
    Object.keys(classes).forEach(cls => {
      const key = getKey(cls, date);
      const record = records[key];
      if (record) {
        totals.present += record.present.length;
        totals.bibles += Number(record.bibles) || 0;
        totals.magazines += Number(record.magazines) || 0;
        totals.visitors += Number(record.visitors) || 0;
        totals.offerPix += Number(record.offerPix) || 0;
        totals.offerCash += Number(record.offerCash) || 0;
        totals.teachersAbsent += Number(record.teachersAbsent) || 0;
      }
    });
    return totals;
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
  const data = editingRecord || getData(selectedClass, currentDate);

  if (isTeacher) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow p-4 mb-4 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-800">{classData.name}</h1>
              <input type="date" value={currentDate} onChange={(e) => setCurrentDate(e.target.value)} className="mt-2 px-3 py-2 border rounded" />
            </div>
            <div className="flex gap-2">
              <button onClick={() => { setShowStudentModal(true); setEditingStudent(null); setStudentName(''); }} className="px-4 py-2 bg-green-100 text-green-700 rounded flex items-center gap-1">
                <Users /> Gerenciar Alunos
              </button>
              <button onClick={() => setUserType(null)} className="px-4 py-2 bg-red-100 text-red-700 rounded">Sair</button>
            </div>
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
            <div className="bg-white rounded-lg shadow p-4">
              <label className="block text-sm font-medium mb-2">Prof. Não Escalados</label>
              <input type="number" min="0" value={data.teachersAbsent} onChange={(e) => updateField(selectedClass, currentDate, 'teachersAbsent', e.target.value)} className="w-full px-3 py-2 border rounded" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 mb-4">
            <label className="block text-sm font-medium mb-2">Observações</label>
            <textarea value={data.notes} onChange={(e) => updateField(selectedClass, currentDate, 'notes', e.target.value)} className="w-full px-3 py-2 border rounded h-24" placeholder="Observações sobre a aula..." />
          </div>

          <div className="bg-white rounded-lg shadow p-4 mb-4">
            <p className="text-sm text-gray-600 mb-2">Total Ofertas:</p>
            <p className="text-3xl font-bold text-green-600">R$ {((Number(data.offerPix) || 0) + (Number(data.offerCash) || 0)).toFixed(2)}</p>
          </div>

          <button onClick={() => saveRecord(selectedClass, currentDate)} disabled={loading} className="w-full bg-indigo-600 text-white py-4 rounded-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2 font-semibold">
            <Save />
            {loading ? 'Salvando...' : 'Salvar Registro'}
          </button>
        </div>

        {showStudentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 max-h-screen overflow-y-auto">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Gerenciar Alunos - {classData.name}</h3>
              
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <label className="block text-sm font-medium mb-2">{editingStudent ? 'Editar Aluno' : 'Adicionar Novo Aluno'}</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Nome do aluno"
                    className="flex-1 px-4 py-2 border rounded-lg"
                  />
                  <button onClick={editingStudent ? updateStudent : addStudent} className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2">
                    <Plus /> {editingStudent ? 'Atualizar' : 'Adicionar'}
                  </button>
                  {editingStudent && (
                    <button onClick={() => { setEditingStudent(null); setStudentName(''); }} className="px-4 py-2 bg-gray-200 rounded-lg">Cancelar</button>
                  )}
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <h4 className="font-semibold text-gray-700">Lista de Alunos ({classData.students.length})</h4>
                {classData.students.map(student => (
                  <div key={student} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">{student}</span>
                    <div className="flex gap-2">
                      <button onClick={() => { setEditingStudent(student); setStudentName(student); }} className="p-2 text-blue-600 hover:bg-blue-100 rounded">
                        <Edit />
                      </button>
                      <button onClick={() => deleteStudent(student)} className="p-2 text-red-600 hover:bg-red-100 rounded">
                        <Trash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button onClick={() => setShowStudentModal(false)} className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300">
                Fechar
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Coordenador
  const todayRecords = Object.entries(records).filter(([key]) => key.includes(currentDate));
  const totals = getTotals(currentDate);

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
          <h2 className="text-2xl font-bold mb-2">Relatório Geral do Dia</h2>
          <p className="mb-4">{new Date(currentDate + 'T00:00:00').toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <p className="text-sm opacity-90">Presentes</p>
              <p className="text-3xl font-bold">{totals.present}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <p className="text-sm opacity-90">Bíblias</p>
              <p className="text-3xl font-bold">{totals.bibles}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <p className="text-sm opacity-90">Revistas</p>
              <p className="text-3xl font-bold">{totals.magazines}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <p className="text-sm opacity-90">Visitantes</p>
              <p className="text-3xl font-bold">{totals.visitors}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <p className="text-sm opacity-90">Oferta PIX</p>
              <p className="text-2xl font-bold">R$ {totals.offerPix.toFixed(2)}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <p className="text-sm opacity-90">Oferta Dinheiro</p>
              <p className="text-2xl font-bold">R$ {totals.offerCash.toFixed(2)}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <p className="text-sm opacity-90">Total Ofertas</p>
              <p className="text-2xl font-bold">R$ {(totals.offerPix + totals.offerCash).toFixed(2)}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <p className="text-sm opacity-90">Prof. Não Escalados</p>
              <p className="text-3xl font-bold">{totals.teachersAbsent}</p>
            </div>
          </div>
        </div>

        {todayRecords.length === 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <p className="text-yellow-800 text-sm">⚠️ Nenhum registro salvo para esta data.</p>
          </div>
        )}

        <div className="bg-white rounded-lg shadow p-6 mb-4">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Relatório Detalhado por Turma</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Turma</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Presentes</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Bíblias</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Revistas</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Visitantes</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Ofertas</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Prof. Ausentes</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {Object.entries(classes).map(([key, cls]) => {
                  const recordKey = getKey(key, currentDate);
                  const record = records[recordKey];
                  const isSaved = !!record;
                  
                  return (
                    <tr key={key} className={isSaved ? 'bg-green-50' : 'bg-white'}>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{cls.name}</td>
                      <td className="px-4 py-3 text-sm">{isSaved ? record.present.length + '/' + cls.students.length : '-'}</td>
                      <td className="px-4 py-3 text-sm">{isSaved ? record.bibles : '-'}</td>
                      <td className="px-4 py-3 text-sm">{isSaved ? record.magazines : '-'}</td>
                      <td className="px-4 py-3 text-sm">{isSaved ? record.visitors : '-'}</td>
                      <td className="px-4 py-3 text-sm font-medium text-green-600">
                        {isSaved ? 'R$ ' + ((Number(record.offerPix) || 0) + (Number(record.offerCash) || 0)).toFixed(2) : '-'}
                      </td>
                      <td className="px-4 py-3 text-sm">{isSaved ? record.teachersAbsent : '-'}</td>
                      <td className="px-4 py-3 text-sm">
                        {isSaved ? (
                          <button onClick={() => { setSelectedClass(key); setEditingRecord(record); setUserType('teacher'); }} className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
                            <Edit /> Editar
                          </button>
                        ) : (
                          <span className="text-gray-400">Sem registro</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<EBDApp />, document.getElementById('root'));
