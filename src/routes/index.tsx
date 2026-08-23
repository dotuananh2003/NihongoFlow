import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from '../components/Auth/ProtectedRoute';
import { Layout } from '../components/Layout/Layout';
import { Home } from '../pages/Home/Home';
import { Landing } from '../pages/Landing/Landing';
import { Login } from '../pages/Auth/Login';
import { Register } from '../pages/Auth/Register';
import { ForgotPassword } from '../pages/Auth/ForgotPassword';
import { ResetPassword } from '../pages/Auth/ResetPassword';
import { Introduction } from '../pages/Introduction/Introduction';
import { Kanji } from '../pages/Kanji/Kanji';
import { KanjiLesson } from '../pages/Kanji/KanjiLesson';
import { KanjiDetail } from '../pages/Kanji/KanjiDetail';
import { Vocabulary } from '../pages/Vocabulary/Vocabulary';
import { VocabularyLessons } from '../pages/Vocabulary/VocabularyLessons';
import { VocabularyDetail } from '../pages/Vocabulary/VocabularyDetail';
import { Grammar } from '../pages/Grammar/Grammar';
import { GrammarLessons } from '../pages/Grammar/GrammarLessons';
import { GrammarDetail } from '../pages/Grammar/GrammarDetail';
import { GrammarPointDetail } from '../pages/Grammar/GrammarPointDetail';
import { Memory } from '../pages/Memory/Memory';
import { ActiveVocabulary } from '../pages/ActiveVocabulary/ActiveVocabulary';
import { Speaking } from '../pages/Speaking/Speaking';
import { Exam } from '../pages/Exam/Exam';
import { ExamHub } from '../pages/Exam/ExamHub';
import { PracticeConfig } from '../pages/Exam/PracticeConfig';
import { PracticeTest } from '../pages/Exam/PracticeTest';
import { MockExamSession } from '../pages/Exam/MockExamSession';
import { KanaPath } from '../pages/Introduction/KanaPath';
import { MnemonicPage } from '../pages/Introduction/MnemonicPage';
import { TypingPage } from '../pages/Introduction/TypingPage';
import { Checkout } from '../pages/Checkout/Checkout';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/landing" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/" element={<Layout />}>
        <Route element={<ProtectedRoute />}>
          <Route index element={<Home />} />
          <Route path="introduction" element={<Introduction />} />
          <Route path="introduction/mnemonic" element={<MnemonicPage />} />
          <Route path="introduction/:system" element={<KanaPath />} />
          <Route path="kanji" element={<Kanji />} />
          <Route path="kanji/:courseId/lesson/:lessonId" element={<KanjiLesson />} />
          <Route path="kanji/:courseId/lesson/:lessonId/:kanjiId" element={<KanjiDetail />} />
          <Route path="vocabulary" element={<Vocabulary />} />
          <Route path="vocabulary/:courseId" element={<VocabularyLessons />} />
          <Route path="vocabulary/:courseId/lesson/:lessonId" element={<VocabularyDetail />} />
          <Route path="grammar" element={<Grammar />} />
          <Route path="grammar/:courseId" element={<GrammarLessons />} />
          <Route path="grammar/:courseId/lesson/:lessonId" element={<GrammarDetail />} />
          <Route path="grammar/:courseId/lesson/:lessonId/point/:pointId" element={<GrammarPointDetail />} />
          <Route path="memory" element={<Memory />} />
          <Route path="active-vocabulary" element={<ActiveVocabulary />} />
          <Route path="speaking" element={<Speaking />} />
          <Route path="exam" element={<Exam />} />
          <Route path="exam/:courseId" element={<ExamHub />} />
          <Route path="exam/:courseId/practice" element={<PracticeConfig />} />
          <Route path="exam/:courseId/practice/test" element={<PracticeTest />} />
          <Route path="checkout/:orderCode" element={<Checkout />} />
        </Route>
      </Route>

      {/* Full-screen routes without Layout */}
      <Route element={<ProtectedRoute />}>
        <Route path="/introduction/typing" element={<TypingPage />} />
        <Route path="/exam/:courseId/mock/:examId" element={<MockExamSession />} />
      </Route>
    </Routes>
  );
};
