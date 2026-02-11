import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  BarChart2, 
  Bell, 
  Search, 
  Settings, 
  ChevronDown,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  FileText,
  Briefcase,
  GraduationCap,
  MessageSquare,
  PieChart,
  UserPlus,
  Zap,
  Filter,
  ClipboardList,
  Database,
  Send
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

// --- Menu Configuration (Updated: Removed subItems for op_dashboard) ---
const MENU_CONFIG = {
  operation: [
    {
      id: 'op_dashboard',
      label: '운영 대시보드',
      icon: LayoutDashboard,
      // subItems removed as requested
    },
    {
      id: 'crm',
      label: 'CRM (상담 & 모집)',
      icon: UserPlus,
      subItems: ['문의 관리', '상담 관리', '고용24 신청자 조회']
    },
    {
      id: 'recruitment',
      label: '모집 및 선발',
      icon: Users,
      subItems: ['고용24 신청자 (API)', '증빙 서류 확인', '결제 확인 (PG)', '정보 매칭', '등록 완료', 'Action Bar']
    },
    {
      id: 'student',
      label: '수강생 관리',
      icon: GraduationCap,
      subItems: ['프로그램 배정', '원격 관리', 'Master Table', '이탈 위험군 필터', '수강생 상세 프로필']
    },
    {
      id: 'attendance',
      label: '출결 및 학습 관리',
      icon: CheckCircle2,
      subItems: ['실시간 출석 리스트', '출결 이의신청', '출결 넛지', '진도 현황', '과제 현황', '프로젝트 진행 관리', '피어 리뷰 독려']
    },
    {
      id: 'mentor',
      label: '강사 및 멘토 관리',
      icon: MessageSquare,
      subItems: ['선발', '배치', '멘토링', '피드백 모니터링', '평가', '재계약 관리']
    },
    {
      id: 'career',
      label: '취업 관리',
      icon: Briefcase,
      subItems: ['인재 데이터 자산화', 'JD 매칭 엔진', '인재 리포트 생성', '기업 파트너십', '리포트 발송 이력', '취업 파이프라인', '취업 확정 처리']
    }
  ],
  admin: [
    {
      id: 'total_dashboard',
      label: '전체 대시보드',
      icon: PieChart,
      subItems: ['매출 분석', '수강생 현황', '시스템 구동 안전성']
    },
    {
      id: 'program_kpi',
      label: '프로그램 성과 관리',
      icon: BarChart2,
      subItems: ['과정별 KPI', '병목 구간 탐지', '프로그램별 사업 평가']
    },
    {
      id: 'org_manage',
      label: '운영 조직 관리',
      icon: ClipboardList,
      subItems: ['매니저별 퍼포먼스', '리소스 배정']
    },
    {
      id: 'data_export',
      label: '통합 데이터 익스포트',
      icon: Database,
      subItems: ['Raw Data 센터']
    }
  ]
};

// --- Mock Data ---

const REVENUE_DATA = [
  { name: '1월', revenue: 4500 },
  { name: '2월', revenue: 5200 },
  { name: '3월', revenue: 4800 },
  { name: '4월', revenue: 6100 },
  { name: '5월', revenue: 5900 },
  { name: '6월', revenue: 7200 },
];

const FUNNEL_DATA = [
  { stage: '유입', count: 1200 },
  { stage: '상담신청', count: 450 },
  { stage: '결제완료', count: 320 },
  { stage: '최종등록', count: 310 },
];

const APPLICANTS = [
  { id: 1, name: '강민준', program: '서비스 기획 5기', phone: '010-1234-5678', hrdStatus: '완료', payment: '완료', nudge: '발송완료', status: '등록완료' },
  { id: 2, name: '송지효', program: '서비스 기획 5기', phone: '010-2345-6789', hrdStatus: '미등록', payment: '미결제', nudge: '독촉필요', status: '대기' },
  { id: 3, name: '이재용', program: '데이터 분석 3기', phone: '010-3456-7890', hrdStatus: '검토중', payment: '부분결제', nudge: '안내완료', status: '심사중' },
  { id: 4, name: '박수진', program: '풀스택 부트캠프', phone: '010-4567-8901', hrdStatus: '완료', payment: '완료', nudge: '발송대기', status: '등록완료' },
];

const RISK_STUDENTS = [
  { id: 1, name: '최현우', program: '프론트엔드 4기', riskLevel: 'High', reason: '스트릭 5일 단절', lastLogin: '5일 전', progress: 45, action: '상담필요' },
  { id: 2, name: '김태희', program: '프론트엔드 4기', riskLevel: 'Medium', reason: '진도율 정체', lastLogin: '2일 전', progress: 62, action: '넛지발송' },
  { id: 3, name: '정우성', program: '백엔드 2기', riskLevel: 'Medium', reason: '과제 미제출', lastLogin: '1일 전', progress: 70, action: '독촉필요' },
];

const TALENT_POOL = [
  { id: 1, name: '김현우', role: 'PM', score: 82, badge: 'Hatching', target: '당근마켓', status: '매칭중' },
  { id: 2, name: '이하늬', role: 'Frontend', score: 91, badge: 'Pro', target: '토스', status: '면접진행' },
  { id: 3, name: '조인성', role: 'Backend', score: 88, badge: 'Rookie', target: '네이버', status: '서류합격' },
];

// --- Components ---

const SidebarItem = ({ icon: Icon, label, active, onClick, hasSub, subItems, expanded, onToggle }) => {
    return (
        <div className="mb-1 select-none">
            <div 
                onClick={() => {
                    onClick();
                    if (hasSub) onToggle();
                }}
                className={`flex items-center justify-between px-4 py-3 cursor-pointer rounded-lg transition-colors ${
                    active ? 'bg-rose-600 text-white shadow-md' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
            >
                <div className="flex items-center gap-3">
                    <Icon size={18} />
                    <span className="font-medium text-sm">{label}</span>
                </div>
                {hasSub && (
                    <div className="text-gray-500">
                        {expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </div>
                )}
            </div>
            {hasSub && expanded && (
                <div className="pl-4 pr-2 py-1 space-y-1 bg-gray-900/30 rounded-b-lg mb-2">
                    {subItems.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 px-4 py-2 text-xs text-gray-500 hover:text-rose-400 hover:bg-gray-800/50 rounded cursor-pointer transition-colors">
                            <div className="w-1 h-1 rounded-full bg-gray-600"></div>
                            {item}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const DashboardCard = ({ title, value, subValue, trend, icon: Icon, trendUp }) => (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-rose-50 rounded-xl text-rose-600">
                <Icon size={24} />
            </div>
            {trend && (
                <span className={`px-2 py-1 rounded text-xs font-bold ${trendUp ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {trend}
                </span>
            )}
        </div>
        <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
        <div className="flex items-end gap-2">
            <span className="text-2xl font-bold text-gray-900">{value}</span>
            <span className="text-sm text-gray-400 mb-1">{subValue}</span>
        </div>
    </div>
);

const RiskBadge = ({ level }) => {
    const colors = {
        High: 'bg-red-100 text-red-600 border-red-200',
        Medium: 'bg-orange-100 text-orange-600 border-orange-200',
        Low: 'bg-green-100 text-green-600 border-green-200'
    };
    return (
        <span className={`px-2 py-1 rounded text-xs font-bold border ${colors[level]}`}>
            {level} Risk
        </span>
    );
};

const StatusBadge = ({ status }) => {
    const styles = {
        '완료': 'bg-green-100 text-green-700',
        '등록완료': 'bg-blue-100 text-blue-700',
        '미결제': 'bg-red-100 text-red-700',
        '독촉필요': 'bg-red-50 text-red-600 font-bold animate-pulse',
        '발송완료': 'bg-gray-100 text-gray-600',
        '대기': 'bg-yellow-100 text-yellow-700'
    };
    return <span className={`px-2 py-1 rounded text-xs ${styles[status] || 'bg-gray-100'}`}>{status}</span>;
};

// --- Main Views ---

const OpDashboardView = () => (
    <div className="space-y-6 animate-fade-in">
        {/* Global Filter Bar - Mockup */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 flex gap-4 items-center shadow-sm">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider"><Filter size={12} className="inline mr-1"/> Global Filter</span>
            <select className="bg-gray-50 border-gray-200 text-sm rounded-lg px-3 py-1.5"><option>전체 프로그램</option><option>서비스 기획 5기</option></select>
            <select className="bg-gray-50 border-gray-200 text-sm rounded-lg px-3 py-1.5"><option>전체 기수</option></select>
            <select className="bg-gray-50 border-gray-200 text-sm rounded-lg px-3 py-1.5"><option>담당자: 전체</option></select>
        </div>

        {/* Recruitment Pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <DashboardCard title="신규 문의" value="45건" subValue="어제 대비 +12" trend="+32%" trendUp={true} icon={MessageSquare} />
            <DashboardCard title="상담 완료" value="28건" subValue="전환율 62%" trend="+5%" trendUp={true} icon={UserPlus} />
            <DashboardCard title="고용24 신청" value="15명" subValue="HRD 연동 완료" trend="-2%" trendUp={false} icon={FileText} />
            <DashboardCard title="최종 등록" value="12명" subValue="결제 완료" trend="+8%" trendUp={true} icon={CheckCircle2} />
        </div>

        {/* Charts & Automation */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                 <h3 className="font-bold text-gray-900 text-lg mb-6">모집 퍼널 현황 (Pipeline)</h3>
                 <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={FUNNEL_DATA}>
                            <defs>
                                <linearGradient id="colorFunnel" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.1}/>
                                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                            <XAxis dataKey="stage" axisLine={false} tickLine={false} />
                            <YAxis axisLine={false} tickLine={false} />
                            <Tooltip />
                            <Area type="monotone" dataKey="count" stroke="#f43f5e" strokeWidth={3} fillOpacity={1} fill="url(#colorFunnel)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
                <div className="flex justify-between items-center mb-6">
                     <div className="flex items-center gap-2">
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                        </span>
                        <h3 className="font-bold text-gray-900">자동화 프로세스</h3>
                     </div>
                </div>
                <div className="flex-1 space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-100 text-green-600 rounded-lg"><Zap size={16}/></div>
                            <span className="text-sm font-medium">HRD-Net 데이터 동기화</span>
                        </div>
                        <span className="text-xs font-bold text-green-600">완료</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Bell size={16}/></div>
                            <span className="text-sm font-medium">결제 미완료 넛지 발송</span>
                        </div>
                        <span className="text-xs font-bold text-blue-600">진행중 (4/10)</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-yellow-100 text-yellow-600 rounded-lg"><Database size={16}/></div>
                            <span className="text-sm font-medium">일일 결산 리포트 생성</span>
                        </div>
                        <span className="text-xs font-bold text-gray-400">대기</span>
                    </div>
                </div>
            </div>
        </div>
        
        {/* Applicant Table Preview */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
             <h3 className="font-bold text-gray-900 mb-4">최근 신청자 현황</h3>
             <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-gray-100 text-xs text-gray-400 uppercase tracking-wider">
                            <th className="pb-3 pl-4">이름/연락처</th>
                            <th className="pb-3">과정명</th>
                            <th className="pb-3">고용24</th>
                            <th className="pb-3">결제</th>
                            <th className="pb-3">AI Nudge</th>
                            <th className="pb-3 text-right pr-4">상세</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {APPLICANTS.map((row) => (
                            <tr key={row.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
                                <td className="py-3 pl-4 font-medium">{row.name} <span className="text-gray-400 text-xs ml-1">{row.phone}</span></td>
                                <td className="py-3 text-gray-500">{row.program}</td>
                                <td className="py-3"><StatusBadge status={row.hrdStatus} /></td>
                                <td className="py-3"><StatusBadge status={row.payment} /></td>
                                <td className="py-3 text-gray-500">{row.nudge}</td>
                                <td className="py-3 text-right pr-4"><Settings size={16} className="inline text-gray-400 cursor-pointer hover:text-rose-500"/></td>
                            </tr>
                        ))}
                    </tbody>
             </table>
        </div>
    </div>
);

const StudentManageView = () => (
    <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">학습 케어 및 이탈 방지</h2>
            <div className="flex gap-2">
                <button className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
                    <Zap size={16} /> 위험군 일괄 넛지
                </button>
            </div>
        </div>

        {/* Risk Queue */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-rose-50/50">
                <div className="flex items-center gap-2">
                    <AlertCircle className="text-rose-500" size={20}/>
                    <h3 className="font-bold text-gray-900">이탈 위험군 필터 (Risk Queue)</h3>
                </div>
                <div className="flex gap-2">
                    <span className="px-3 py-1 bg-white border border-rose-200 text-rose-600 rounded-full text-xs font-bold">High: 12명</span>
                    <span className="px-3 py-1 bg-white border border-orange-200 text-orange-600 rounded-full text-xs font-bold">Medium: 24명</span>
                </div>
            </div>
            <table className="w-full text-left">
                <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                    <tr>
                        <th className="py-3 pl-6">수강생</th>
                        <th className="py-3">과정</th>
                        <th className="py-3">위험도</th>
                        <th className="py-3">감지 원인</th>
                        <th className="py-3">최종 접속</th>
                        <th className="py-3">진도율</th>
                        <th className="py-3 text-right pr-6">Action</th>
                    </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-100">
                    {RISK_STUDENTS.map((student) => (
                        <tr key={student.id} className="hover:bg-gray-50">
                            <td className="py-4 pl-6 font-bold text-gray-900">{student.name}</td>
                            <td className="py-4 text-gray-600">{student.program}</td>
                            <td className="py-4"><RiskBadge level={student.riskLevel} /></td>
                            <td className="py-4 text-gray-600">{student.reason}</td>
                            <td className="py-4 text-gray-500">{student.lastLogin}</td>
                            <td className="py-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-20 bg-gray-200 rounded-full h-1.5">
                                        <div className="bg-rose-500 h-1.5 rounded-full" style={{width: `${student.progress}%`}}></div>
                                    </div>
                                    <span className="text-xs text-gray-500">{student.progress}%</span>
                                </div>
                            </td>
                            <td className="py-4 text-right pr-6">
                                <button className="text-xs font-bold text-rose-600 border border-rose-200 bg-white px-3 py-1.5 rounded hover:bg-rose-50 transition-colors">
                                    {student.action}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        
        {/* Attendance & KPI */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4">실시간 출결 현황</h3>
                <div className="flex items-center gap-8">
                     <div className="relative w-32 h-32 flex-none">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                            <path className="text-gray-100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.8" />
                            <path className="text-rose-500" strokeDasharray="92, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.8" />
                        </svg>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                            <span className="text-2xl font-bold text-gray-900">92%</span>
                        </div>
                     </div>
                     <div className="flex-1 space-y-3">
                        <div className="flex justify-between items-center p-2 bg-green-50 rounded-lg">
                            <span className="text-xs font-medium text-green-700">출석</span>
                            <span className="font-bold text-green-800">1,140명</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-yellow-50 rounded-lg">
                            <span className="text-xs font-medium text-yellow-700">지각</span>
                            <span className="font-bold text-yellow-800">65명</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-red-50 rounded-lg">
                            <span className="text-xs font-medium text-red-700">결석</span>
                            <span className="font-bold text-red-800">35명</span>
                        </div>
                     </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-gray-900">과제/프로젝트 현황</h3>
                    <button className="text-xs text-rose-500 font-bold hover:underline">상세보기</button>
                </div>
                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">React 심화 과제</span>
                            <span className="text-gray-900 font-bold">88% 제출</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                            <div className="bg-rose-500 h-2 rounded-full" style={{width: '88%'}}></div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">파이널 프로젝트 기획서</span>
                            <span className="text-gray-900 font-bold">45% 제출</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                            <div className="bg-orange-400 h-2 rounded-full" style={{width: '45%'}}></div>
                        </div>
                        <p className="text-xs text-orange-500 mt-1">* 마감 임박: 미제출자 독촉 넛지 권장</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const TalentView = () => (
    <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">커리어 매칭 & 인재 리포트</h2>
            <div className="flex gap-2">
                <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-bold hover:bg-gray-50 shadow-sm">
                    리포트 일괄 생성
                </button>
                <button className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-bold hover:bg-gray-800 flex items-center gap-2 shadow-sm">
                    <Send size={14} /> 기업 추천 발송
                </button>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TALENT_POOL.map((talent) => (
                <div key={talent.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:border-rose-300 transition-all cursor-pointer group hover:shadow-md">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-lg font-bold text-gray-500 group-hover:bg-rose-100 group-hover:text-rose-600 transition-colors">
                                {talent.name[0]}
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">{talent.name}</h3>
                                <p className="text-xs text-gray-500">{talent.role} | {talent.badge}</p>
                            </div>
                        </div>
                        <div className="text-right">
                             <span className="block text-xl font-bold text-rose-500">{talent.score}점</span>
                             <span className="text-xs text-gray-400">JD 적합도</span>
                        </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-xl p-3 mb-4 border border-gray-100">
                        <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-500 truncate max-w-[100px]" title={talent.target}>{talent.target}</span>
                            <span className="font-bold text-gray-700">{talent.status}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div className="bg-rose-500 h-1.5 rounded-full" style={{width: '70%'}}></div>
                        </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                        <button className="flex-1 py-2 text-xs font-bold text-gray-600 border border-gray-200 rounded-lg hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 flex items-center justify-center gap-1 transition-colors">
                            <FileText size={14} /> 리포트
                        </button>
                        <button className="flex-1 py-2 text-xs font-bold text-white bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                            매칭 관리
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

// --- Layout ---

const AdminApp = () => {
    const [activeTab, setActiveTab] = useState('op_dashboard');
    const [expandedMenus, setExpandedMenus] = useState({});

    // Toggle menu expansion
    const toggleMenu = (menuId) => {
        setExpandedMenus(prev => ({
            ...prev,
            [menuId]: !prev[menuId]
        }));
    };

    return (
        <div className="flex h-screen bg-gray-50 font-sans text-gray-900">
            {/* Sidebar */}
            <aside className="w-72 bg-[#1a1c23] text-gray-400 flex flex-col flex-none shadow-xl z-20">
                <div className="h-16 flex items-center px-6 border-b border-gray-800 bg-[#15171d]">
                     <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-rose-500 to-rose-700 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg">K</div>
                        <span className="text-white font-bold text-lg tracking-tight">Kernel Admin</span>
                     </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-700">
                    {/* Operation Section */}
                    <div className="mb-6">
                        <p className="px-4 text-[10px] font-extrabold text-gray-500 mb-2 uppercase tracking-widest">Operation</p>
                        {MENU_CONFIG.operation.map(item => (
                            <SidebarItem 
                                key={item.id}
                                icon={item.icon} 
                                label={item.label} 
                                active={activeTab === item.id} 
                                onClick={() => setActiveTab(item.id)} 
                                hasSub={!!item.subItems}
                                subItems={item.subItems}
                                expanded={expandedMenus[item.id]}
                                onToggle={() => toggleMenu(item.id)}
                            />
                        ))}
                    </div>

                    {/* Administration Section */}
                    <div>
                        <p className="px-4 text-[10px] font-extrabold text-gray-500 mb-2 uppercase tracking-widest">Administration</p>
                        {MENU_CONFIG.admin.map(item => (
                            <SidebarItem 
                                key={item.id}
                                icon={item.icon} 
                                label={item.label} 
                                active={activeTab === item.id} 
                                onClick={() => setActiveTab(item.id)} 
                                hasSub={!!item.subItems}
                                subItems={item.subItems}
                                expanded={expandedMenus[item.id]}
                                onToggle={() => toggleMenu(item.id)}
                            />
                        ))}
                    </div>
                </div>

                <div className="p-4 border-t border-gray-800 bg-[#15171d]">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold border-2 border-gray-600">A</div>
                        <div>
                            <p className="text-sm font-bold text-white">통합 어드민</p>
                            <p className="text-[10px] text-rose-500 bg-rose-900/30 px-1.5 py-0.5 rounded border border-rose-900/50 inline-block mt-0.5">Super Admin</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-full overflow-hidden relative">
                {/* Top Navigation Bar */}
                <header className="h-16 bg-white border-b border-gray-200 flex justify-between items-center px-8 flex-none shadow-sm z-10">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors">
                            <Filter size={14} className="text-gray-400" />
                            <span>전체 프로그램</span>
                            <ChevronDown size={14} className="text-gray-400" />
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors">
                            <span>전체 기수</span>
                            <ChevronDown size={14} className="text-gray-400" />
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="bg-rose-50 text-rose-600 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 border border-rose-100 shadow-sm animate-pulse">
                            <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                             OS v2.0 실시간 연동 중
                        </div>
                        <div className="flex items-center gap-2 border-l border-gray-200 pl-6">
                             <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors relative">
                                <Bell size={20} />
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-white"></span>
                            </button>
                             <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                                <Settings size={20} />
                            </button>
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-8 bg-[#F8F9FC]">
                    <div className="max-w-7xl mx-auto pb-10">
                        {/* Dynamic Rendering Based on Active Tab */}
                        {(activeTab === 'op_dashboard' || activeTab === 'total_dashboard') && <OpDashboardView />}
                        {(activeTab === 'crm' || activeTab === 'recruitment') && (
                            <div className="text-center py-20">
                                <h3 className="text-2xl font-bold text-gray-300 mb-2">CRM & Recruitment Module</h3>
                                <p className="text-gray-400">문의 관리 및 고용24 신청자 연동 화면이 표시됩니다.</p>
                                {/* Using OpDashboardView as placeholder to maintain visual completeness */}
                                <div className="mt-8 opacity-50 pointer-events-none scale-95 transform origin-top">
                                     <OpDashboardView />
                                </div>
                            </div>
                        )}
                        {(activeTab === 'student' || activeTab === 'attendance') && <StudentManageView />}
                        {activeTab === 'mentor' && (
                             <div className="text-center py-20">
                                <h3 className="text-2xl font-bold text-gray-300 mb-2">Instructor & Mentor Module</h3>
                                <p className="text-gray-400">강사 선발 및 멘토링 일정 관리 화면이 표시됩니다.</p>
                            </div>
                        )}
                        {activeTab === 'career' && <TalentView />}
                        {(activeTab === 'program_kpi' || activeTab === 'org_manage' || activeTab === 'data_export') && (
                             <div className="text-center py-20">
                                <h3 className="text-2xl font-bold text-gray-300 mb-2">Administration Module</h3>
                                <p className="text-gray-400">관리자 전용 KPI 및 리소스 관리 화면이 표시됩니다.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminApp;
