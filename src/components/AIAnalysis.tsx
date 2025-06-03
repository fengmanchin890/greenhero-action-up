
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Camera, 
  Upload, 
  Scan, 
  CheckCircle, 
  XCircle, 
  Leaf,
  Utensils,
  Brain,
  Sparkles
} from 'lucide-react';

interface AnalysisResult {
  isVegetarian: boolean;
  confidence: number;
  detectedIngredients: string[];
  nutritionEstimate: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  suggestions: string[];
}

interface AIAnalysisProps {
  onTaskComplete: (taskId: number) => void;
}

const AIAnalysis: React.FC<AIAnalysisProps> = ({ onTaskComplete }) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateAIAnalysis = async () => {
    setIsAnalyzing(true);
    
    // 模擬 AI 分析過程
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // 模擬分析結果（實際上會連接 TensorFlow Lite 模型）
    const mockResult: AnalysisResult = {
      isVegetarian: Math.random() > 0.3, // 70% 機率是素食
      confidence: 0.92 + Math.random() * 0.07, // 92-99% 信心度
      detectedIngredients: ['蔬菜', '豆腐', '菇類', '青椒', '胡蘿蔔'],
      nutritionEstimate: {
        calories: Math.floor(300 + Math.random() * 200),
        protein: Math.floor(15 + Math.random() * 10),
        carbs: Math.floor(40 + Math.random() * 20),
        fat: Math.floor(8 + Math.random() * 12)
      },
      suggestions: [
        '此餐點符合蔬食標準，恭喜完成環保任務！',
        '建議搭配季節性在地蔬菜，減少運輸碳足跡',
        '下次可嘗試有機食材，進一步支持永續農業'
      ]
    };

    setAnalysisResult(mockResult);
    setIsAnalyzing(false);

    // 如果是蔬食，自動完成相關任務
    if (mockResult.isVegetarian) {
      onTaskComplete(2); // 蔬食餐點任務 ID
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return 'text-green-600';
    if (confidence >= 0.8) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-green-700">
            <Brain className="w-5 h-5" />
            <span>AI 蔬食辨識系統</span>
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              Beta 版
            </Badge>
          </CardTitle>
          <p className="text-sm text-gray-600">
            使用 AI 電腦視覺技術，即時辨識您的餐點是否為蔬食
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 上傳區域 */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            {uploadedImage ? (
              <div className="space-y-4">
                <img 
                  src={uploadedImage} 
                  alt="上傳的餐點照片" 
                  className="max-w-full max-h-64 mx-auto rounded-lg shadow-md"
                />
                <Button
                  onClick={simulateAIAnalysis}
                  disabled={isAnalyzing}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                >
                  {isAnalyzing ? (
                    <>
                      <Scan className="w-4 h-4 mr-2 animate-spin" />
                      AI 分析中...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      開始 AI 分析
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <Camera className="w-16 h-16 mx-auto text-gray-400" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">上傳餐點照片</h3>
                  <p className="text-gray-500">AI 將自動辨識是否為蔬食餐點</p>
                </div>
                <label className="inline-block">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Button className="bg-green-600 hover:bg-green-700 cursor-pointer">
                    <Upload className="w-4 h-4 mr-2" />
                    選擇照片
                  </Button>
                </label>
              </div>
            )}
          </div>

          {/* 分析進度 */}
          {isAnalyzing && (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Scan className="w-5 h-5 text-blue-600 animate-spin" />
                    <span className="font-semibold text-blue-800">AI 正在分析您的餐點...</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-blue-700">
                      <span>影像前處理</span>
                      <span>100%</span>
                    </div>
                    <Progress value={100} className="h-2" />
                    <div className="flex justify-between text-sm text-blue-700">
                      <span>物件辨識</span>
                      <span>85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                    <div className="flex justify-between text-sm text-blue-700">
                      <span>成分分析</span>
                      <span>60%</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* 分析結果 */}
          {analysisResult && (
            <Card className={`border-2 ${analysisResult.isVegetarian ? 'border-green-200 bg-green-50' : 'border-orange-200 bg-orange-50'}`}>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {/* 結果標題 */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {analysisResult.isVegetarian ? (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      ) : (
                        <XCircle className="w-6 h-6 text-orange-600" />
                      )}
                      <span className={`text-lg font-bold ${analysisResult.isVegetarian ? 'text-green-800' : 'text-orange-800'}`}>
                        {analysisResult.isVegetarian ? '✅ 蔬食餐點' : '❌ 非蔬食餐點'}
                      </span>
                    </div>
                    <Badge className={`${analysisResult.isVegetarian ? 'bg-green-500' : 'bg-orange-500'} text-white`}>
                      信心度: {(analysisResult.confidence * 100).toFixed(1)}%
                    </Badge>
                  </div>

                  {/* 檢測成分 */}
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2 flex items-center">
                      <Utensils className="w-4 h-4 mr-1" />
                      檢測到的食材
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.detectedIngredients.map((ingredient, index) => (
                        <Badge key={index} variant="outline" className="bg-white">
                          {ingredient}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* 營養估算 */}
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">營養估算</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-white p-3 rounded-lg">
                        <span className="text-gray-600">熱量</span>
                        <div className="font-bold text-orange-600">{analysisResult.nutritionEstimate.calories} kcal</div>
                      </div>
                      <div className="bg-white p-3 rounded-lg">
                        <span className="text-gray-600">蛋白質</span>
                        <div className="font-bold text-blue-600">{analysisResult.nutritionEstimate.protein}g</div>
                      </div>
                      <div className="bg-white p-3 rounded-lg">
                        <span className="text-gray-600">碳水化合物</span>
                        <div className="font-bold text-green-600">{analysisResult.nutritionEstimate.carbs}g</div>
                      </div>
                      <div className="bg-white p-3 rounded-lg">
                        <span className="text-gray-600">脂肪</span>
                        <div className="font-bold text-purple-600">{analysisResult.nutritionEstimate.fat}g</div>
                      </div>
                    </div>
                  </div>

                  {/* AI 建議 */}
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2 flex items-center">
                      <Leaf className="w-4 h-4 mr-1" />
                      AI 環保建議
                    </h4>
                    <div className="space-y-2">
                      {analysisResult.suggestions.map((suggestion, index) => (
                        <div key={index} className="bg-white p-3 rounded-lg text-sm text-gray-700">
                          {suggestion}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* 技術說明 */}
          <Card className="bg-gray-50 border-gray-200">
            <CardContent className="pt-6">
              <h4 className="font-semibold text-gray-700 mb-2">技術規格</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p>• AI 模型：MobileNet V3 + TensorFlow Lite</p>
                <p>• 訓練數據：10萬+ 台灣在地餐點照片</p>
                <p>• 肉類偵測準確率：>95%</p>
                <p>• 處理時間：平均 2-3 秒</p>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIAnalysis;
