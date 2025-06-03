
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Leaf, 
  Coins, 
  Trophy, 
  Users, 
  MapPin, 
  Bike, 
  Utensils, 
  Recycle, 
  TreePine,
  Gift,
  Star,
  Target,
  Calendar,
  Award,
  TrendingUp,
  ShoppingCart
} from 'lucide-react';

interface Task {
  id: number;
  title: string;
  category: 'transport' | 'food' | 'lifestyle' | 'special';
  coins: number;
  completed: boolean;
  icon: React.ReactNode;
  description: string;
}

interface Achievement {
  id: number;
  title: string;
  level: 'bronze' | 'silver' | 'gold' | 'diamond';
  progress: number;
  total: number;
  icon: React.ReactNode;
}

const Index = () => {
  const [greenCoins, setGreenCoins] = useState(1250);
  const [userLevel, setUserLevel] = useState('silver');
  const [streakDays, setStreakDays] = useState(7);
  
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: '搭乘大眾運輸',
      category: 'transport',
      coins: 50,
      completed: true,
      icon: <Bike className="w-5 h-5" />,
      description: '今日使用捷運或公車通勤'
    },
    {
      id: 2,
      title: '蔬食餐點',
      category: 'food',
      coins: 30,
      completed: false,
      icon: <Utensils className="w-5 h-5" />,
      description: '選擇蔬食餐點，減少碳足跡'
    },
    {
      id: 3,
      title: '垃圾分類',
      category: 'lifestyle',
      coins: 20,
      completed: false,
      icon: <Recycle className="w-5 h-5" />,
      description: '正確進行垃圾分類回收'
    },
    {
      id: 4,
      title: '淨灘活動',
      category: 'special',
      coins: 100,
      completed: false,
      icon: <TreePine className="w-5 h-5" />,
      description: '參與週末淨灘環保活動'
    }
  ]);

  const achievements: Achievement[] = [
    {
      id: 1,
      title: '通勤英雄',
      level: 'gold',
      progress: 25,
      total: 30,
      icon: <Bike className="w-6 h-6" />
    },
    {
      id: 2,
      title: '蔬食達人',
      level: 'silver',
      progress: 12,
      total: 20,
      icon: <Utensils className="w-6 h-6" />
    },
    {
      id: 3,
      title: '回收專家',
      level: 'bronze',
      progress: 8,
      total: 10,
      icon: <Recycle className="w-6 h-6" />
    }
  ];

  const leaderboard = [
    { rank: 1, name: '環保小尖兵', coins: 2850, avatar: '🌱' },
    { rank: 2, name: '綠色生活家', coins: 2640, avatar: '🌿' },
    { rank: 3, name: '地球守護者', coins: 2420, avatar: '🌍' },
    { rank: 4, name: '你', coins: greenCoins, avatar: '😊' },
    { rank: 5, name: '永續行動派', coins: 1180, avatar: '♻️' }
  ];

  const completeTask = (taskId: number) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId && !task.completed) {
        setGreenCoins(prev => prev + task.coins);
        return { ...task, completed: true };
      }
      return task;
    }));
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'bronze': return 'bg-amber-600';
      case 'silver': return 'bg-gray-400';
      case 'gold': return 'bg-yellow-500';
      case 'diamond': return 'bg-blue-400';
      default: return 'bg-gray-400';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'transport': return <Bike className="w-4 h-4" />;
      case 'food': return <Utensils className="w-4 h-4" />;
      case 'lifestyle': return <Recycle className="w-4 h-4" />;
      case 'special': return <TreePine className="w-4 h-4" />;
      default: return <Leaf className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center animate-pulse-glow">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">GreenHero</h1>
                <p className="text-green-100">打造永續未來，從每日行動開始</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2 mb-1">
                <Coins className="w-5 h-5 text-yellow-300" />
                <span className="text-xl font-bold">{greenCoins}</span>
              </div>
              <Badge className={`${getLevelColor(userLevel)} text-white`}>
                {userLevel.toUpperCase()} 級英雄
              </Badge>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-white/10 rounded-lg p-3">
              <div className="flex items-center justify-center mb-1">
                <Calendar className="w-4 h-4 mr-1" />
                <span className="text-sm">連續打卡</span>
              </div>
              <div className="text-xl font-bold">{streakDays} 天</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <div className="flex items-center justify-center mb-1">
                <Target className="w-4 h-4 mr-1" />
                <span className="text-sm">本月任務</span>
              </div>
              <div className="text-xl font-bold">18/30</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <div className="flex items-center justify-center mb-1">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span className="text-sm">減碳量</span>
              </div>
              <div className="text-xl font-bold">45kg</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6">
        <Tabs defaultValue="tasks" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white shadow-md">
            <TabsTrigger value="tasks" className="flex items-center space-x-2">
              <Target className="w-4 h-4" />
              <span>每日任務</span>
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center space-x-2">
              <Trophy className="w-4 h-4" />
              <span>成就</span>
            </TabsTrigger>
            <TabsTrigger value="social" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>社群</span>
            </TabsTrigger>
            <TabsTrigger value="rewards" className="flex items-center space-x-2">
              <Gift className="w-4 h-4" />
              <span>兌換</span>
            </TabsTrigger>
          </TabsList>

          {/* Tasks Tab */}
          <TabsContent value="tasks" className="space-y-6">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-green-700">
                  <Target className="w-5 h-5" />
                  <span>今日環保任務</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                        task.completed
                          ? 'bg-green-50 border-green-200 shadow-sm'
                          : 'bg-white border-gray-200 hover:border-green-300 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-full ${task.completed ? 'bg-green-100' : 'bg-gray-100'}`}>
                            {getCategoryIcon(task.category)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800">{task.title}</h3>
                            <p className="text-sm text-gray-600">{task.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-1 text-green-600">
                            <Coins className="w-4 h-4" />
                            <span className="font-semibold">+{task.coins}</span>
                          </div>
                          <Button
                            onClick={() => completeTask(task.id)}
                            disabled={task.completed}
                            className={`transition-all duration-300 ${
                              task.completed
                                ? 'bg-green-500 hover:bg-green-500'
                                : 'bg-green-600 hover:bg-green-700 hover:scale-105'
                            }`}
                          >
                            {task.completed ? '已完成' : '完成'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-green-700">
                  <Trophy className="w-5 h-5" />
                  <span>成就進度</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {achievements.map((achievement) => (
                    <div key={achievement.id} className="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-full ${getLevelColor(achievement.level)}`}>
                            {achievement.icon}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800">{achievement.title}</h3>
                            <Badge className={`${getLevelColor(achievement.level)} text-white text-xs`}>
                              {achievement.level.toUpperCase()}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-gray-600">
                            {achievement.progress}/{achievement.total}
                          </div>
                        </div>
                      </div>
                      <Progress 
                        value={(achievement.progress / achievement.total) * 100} 
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Social Tab */}
          <TabsContent value="social" className="space-y-6">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-green-700">
                  <Users className="w-5 h-5" />
                  <span>排行榜</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard.map((user) => (
                    <div
                      key={user.rank}
                      className={`p-4 rounded-lg border transition-all duration-300 ${
                        user.name === '你'
                          ? 'bg-green-50 border-green-200 shadow-md animate-pulse-glow'
                          : 'bg-white border-gray-200 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                            user.rank <= 3 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' : 'bg-gray-400'
                          }`}>
                            {user.rank <= 3 ? <Award className="w-4 h-4" /> : user.rank}
                          </div>
                          <div className="text-2xl">{user.avatar}</div>
                          <div>
                            <h3 className="font-semibold text-gray-800">{user.name}</h3>
                            <div className="flex items-center space-x-1 text-green-600">
                              <Coins className="w-4 h-4" />
                              <span className="text-sm">{user.coins} 綠幣</span>
                            </div>
                          </div>
                        </div>
                        {user.rank <= 3 && (
                          <Star className="w-5 h-5 text-yellow-500 animate-bounce-subtle" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Rewards Tab */}
          <TabsContent value="rewards" className="space-y-6">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-green-700">
                  <Gift className="w-5 h-5" />
                  <span>綠幣兌換中心</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: '星巴克咖啡券', coins: 200, category: '餐飲優惠' },
                    { name: '全聯購物金 $50', coins: 500, category: '購物優惠' },
                    { name: '環保餐具組', coins: 300, category: '環保商品' },
                    { name: '淨灘活動捐款', coins: 100, category: '公益捐贈' },
                    { name: 'YouBike 免費券', coins: 150, category: '交通優惠' },
                    { name: '樹苗認養計畫', coins: 800, category: '環保行動' }
                  ].map((reward, index) => (
                    <div
                      key={index}
                      className="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300 hover:scale-105"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-800">{reward.name}</h3>
                        <ShoppingCart className="w-5 h-5 text-green-600" />
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{reward.category}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1 text-green-600">
                          <Coins className="w-4 h-4" />
                          <span className="font-semibold">{reward.coins} 綠幣</span>
                        </div>
                        <Button
                          size="sm"
                          disabled={greenCoins < reward.coins}
                          className="bg-green-600 hover:bg-green-700 transition-all duration-300 hover:scale-105"
                        >
                          兌換
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
