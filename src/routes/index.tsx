import { Routes, Route } from 'react-router-dom';
import { Layout } from '../components/Layout/Layout';
import { Home } from '../pages/Home/Home';
import { Introduction } from '../pages/Introduction/Introduction';
import { Kanji } from '../pages/Kanji/Kanji';
import { Vocabulary } from '../pages/Vocabulary/Vocabulary';
import { Grammar } from '../pages/Grammar/Grammar';
import { Memory } from '../pages/Memory/Memory';
import { ActiveVocabulary } from '../pages/ActiveVocabulary/ActiveVocabulary';
import { Speaking } from '../pages/Speaking/Speaking';
import { Exam } from '../pages/Exam/Exam';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="introduction" element={<Introduction />} />
        <Route path="kanji" element={<Kanji />} />
        <Route path="vocabulary" element={<Vocabulary />} />
        <Route path="grammar" element={<Grammar />} />
        <Route path="memory" element={<Memory />} />
        <Route path="active-vocabulary" element={<ActiveVocabulary />} />
        <Route path="speaking" element={<Speaking />} />
        <Route path="exam" element={<Exam />} />
      </Route>
    </Routes>
  );
};
