import { Routes, Route } from 'react-router-dom';
import { Layout } from '../components/Layout/Layout';
import { Home } from '../pages/Home/Home';
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
import { KanaPath } from '../pages/Introduction/KanaPath';
import { MnemonicPage } from '../pages/Introduction/MnemonicPage';
import { TypingPage } from '../pages/Introduction/TypingPage';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="introduction" element={<Introduction />} />
        <Route path="introduction/mnemonic" element={<MnemonicPage />} />
        <Route path="introduction/typing" element={<TypingPage />} />
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
      </Route>
    </Routes>
  );
};
