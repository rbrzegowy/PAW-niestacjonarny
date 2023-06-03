# Lab7 - RxJS

Wykonaj ćwiczenia wykorzystując RxJS:  
1. **Głosowanie**  
Są trzy osoby uprawnione do głosowania ('za'/'przeciw'). Pierwsza oddaje głos po 2s, druga po 3s, trzeci po 1s. Zaprezentuj wyniki głosowania gdy wszystkie głosy zostaną oddane.
Gotowe? Zmodyfikuj kod by głosy były losowe (pamiętaj by nie duplikować kodu). Wykorzystaj: timer + map lub of + delay oraz jeden z operatorów grupujących.
1. **API**  
Za pomocą strumienia timer() (lub of i delay) zasymuluj strumień zapytanie do API. Utwórz trzy strumienie - każdy strumień symulujący API powinien pobierać na wejściu string i zwracać ten sam string z dopiskiem "(from stream X)". Stwórz strumień który wykona:
* Trzy zapytania do API jedno po drugim
* Trzy zapytania do API równolegle
* Dwa zapytania równolegle i trzecie po zakończeniu dwóch poprzednich
1. **Szybki klik**
Zaprojektuj mini grę. Gra losuje krótki przedział czasu. Zadaniem użytkownika jest kliknąć w jeden z trzech przycisków (wskazywany losowo przez grę) zanim upłynie czas.
1. **Mistrz klawiatury**
Zaprojektuj mini grę. Gra losuje krótki przedział czasu i klawisz do wciśnięcia. Jeśli użytkownik wciśnie klawisz w określonym czasie (stoper widoczny na ekranie), zdobywa punkt, jeśli nie - traci szansę. Gra kończy się po określonym czasie lub określonej liczbie porażek lub zdobyciu określonej ilości punktów (wtedy wynikiem jest sumaryczny czas)