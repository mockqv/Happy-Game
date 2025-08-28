'use client';

import { useEffect } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from 'database/firebase';

type ViewTrackerProps = {
  documentId: string;
  documentType: 'game' | 'player' | 'tournament';
  documentName: string;
};

export function ViewTracker({ documentId, documentType, documentName }: ViewTrackerProps) {
  useEffect(() => {
    const recordView = async () => {
      try {
        const viewsCollectionRef = collection(db, 'views');
        await addDoc(viewsCollectionRef, {
          documentId,
          documentType,
          documentName,
          timestamp: serverTimestamp(),
        });
        console.log(`View registrada para ${documentType}: ${documentId}`);
      } catch (error) {
        console.error("Erro ao registrar a visualização:", error);
      }
    };

    recordView();
  }, [documentId, documentType, documentName]);

  return null;
}