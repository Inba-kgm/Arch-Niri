(() => {
  // src/localization.ts
  var defaultStrings = {
    insertDrawing: "Insert Drawing",
    insertDrawingInNewWindow: "Insert drawing in new window",
    restoreFromAutosave: "Restore from autosaved drawing",
    deleteAutosave: "Delete all autosaved drawings",
    noSuchAutosaveExists: "No autosave exists",
    discardChanges: "Discard changes",
    defaultImageTitle: "Freehand Drawing",
    edit: "Edit",
    close: "Close",
    saveAndClose: "Save and close",
    overwriteExisting: "Overwrite existing",
    saveAsNewDrawing: "Save as a new drawing",
    clickBelowToContinue: "Done! Click below to continue.",
    discardUnsavedChanges: "Discard unsaved changes?",
    resumeEditing: "Resume editing",
    saveAndResumeEditing: "Save and resume editing",
    saveChanges: "Save changes",
    exitInstructions: "All changes saved! Click below to exit.",
    settingsPaneDescription: "Settings for the Freehand Drawing image editor.",
    setting__disableFullScreen: "Dialog mode",
    setting__disableFullScreenDescription: "Enabling this setting causes the editor to only partially fill the Joplin window.",
    setting__autosaveIntervalSettingLabel: "Autosave interval (minutes)",
    setting__autosaveIntervalSettingDescription: 'Adjusts how often a backup copy of the current drawing is created. The most recent autosave can be restored by searching for ":restore autosave" in the command palette (ctrl+shift+p or cmd+shift+p on MacOS) and clicking "Restore from autosaved drawing". If this setting is set to zero, autosaves are created every two minutes.',
    setting__themeLabel: "Theme",
    setting__toolbarTypeLabel: "Toolbar type",
    setting__toolbarTypeDescription: "This setting switches between possible toolbar user interfaces for the image editor.",
    setting__keyboardShortcuts: "Keyboard shortcuts",
    toolbarTypeDefault: "Default",
    toolbarTypeSidebar: "Sidebar",
    toolbarTypeDropdown: "Dropdown",
    styleMatchJoplin: "Match Joplin",
    styleJsDrawLight: "Light",
    styleJsDrawDark: "Dark",
    images: "Images",
    pdfs: "PDFs",
    allFiles: "All Files",
    loadLargePdf: (pageCount) => `A selected file is a large PDF (${pageCount} pages). Loading it may take some time and increase the size of the current drawing. Continue?`,
    notAnEditableImage: (resourceId, resourceType) => `Resource ${resourceId} is not an editable image. Unable to edit resource of type ${resourceType}.`
  };
  var localizations = {
    de: {
      insertDrawing: "Zeichnung einf\xFCgen",
      insertDrawingInNewWindow: "Zeichnung in neuem Fenster einf\xFCgen",
      restoreFromAutosave: "Automatische Sicherung wiederherstellen",
      deleteAutosave: "Alle automatischen Sicherungen l\xF6schen",
      noSuchAutosaveExists: "Keine automatischen Sicherungen vorhanden",
      discardChanges: "\xC4nderungen verwerfen",
      defaultImageTitle: "Freihand-Zeichnen",
      edit: "Bearbeiten",
      close: "Schlie\xDFen",
      saveAndClose: "Speichern und Schlie\xDFen",
      overwriteExisting: "Existierende Zeichnung \xFCberschreiben",
      saveAsNewDrawing: "Als neue Zeichnung speichern",
      clickBelowToContinue: "Fertig! Unten klicken, um fortzufahen.",
      discardUnsavedChanges: "Ungespeicherte \xC4nderungen verwerfen?",
      resumeEditing: "Weiter bearbeiten",
      saveAndResumeEditing: "Speichern und weiter bearbeiten",
      saveChanges: "\xC4nderungen speichern",
      exitInstructions: "Alle \xC4nderungen gespeichert! Unten klicken, um das Fenster zu schlie\xDFen.",
      settingsPaneDescription: "Einstellungen f\xFCr Freihand-Zeichnen.",
      setting__disableFullScreen: "Dialogmodus",
      setting__disableFullScreenDescription: "Wenn diese Einstellung aktiviert ist, f\xFCllt der Editor das Joplin-Fenster nur teilweise aus.",
      setting__autosaveIntervalSettingLabel: "Intervall f\xFCr die automatische Speicherung (Minuten)",
      setting__autosaveIntervalSettingDescription: "Legt fest, wie oft eine Sicherungskopie der aktuellen Zeichnung erstellt wird. Die letzte automatische Speicherung kann wiederhergestellt werden, indem du in der Befehlspalette (Strg+Umschalt+P oder Cmd+Umschalt+P unter MacOS) nach \u201E:restore autosave\u201C suchst und auf \u201EAutomatische Sicherung wiederherstellen\u201C klickst. Wenn diese Einstellung auf Null gesetzt ist, werden alle zwei Minuten automatische Speichervorg\xE4nge durchgef\xFChrt.",
      setting__themeLabel: "Design",
      setting__toolbarTypeLabel: "Toolbar-Typ",
      setting__toolbarTypeDescription: "Diese Einstellung wechselt zwischen den m\xF6glichen Benutzeroberfl\xE4chen der Symbolleiste f\xFCr den Bildeditor.",
      setting__keyboardShortcuts: "Tastaturk\xFCrzel",
      toolbarTypeDefault: "Standard",
      toolbarTypeSidebar: "Sidebar",
      toolbarTypeDropdown: "Dropdown-Men\xFC",
      styleMatchJoplin: "wie Joplin",
      styleJsDrawLight: "Hell",
      styleJsDrawDark: "Dunkel",
      images: "Bilder",
      pdfs: "PDFs",
      allFiles: "Alle Dateien",
      loadLargePdf: (pageCount) => `Die ausgew\xE4hlte Datei ist eine gro\xDFe PDF-Datei (mit ${pageCount} Seiten). Das Laden kann einige Zeit dauern und die Gr\xF6\xDFe der aktuellen Zeichnung erh\xF6hen. Fortfahren?`,
      notAnEditableImage: (resourceId, resourceType) => `Die Ressource ${resourceId} ist kein bearbeitbares Bild. Ressource vom Typ ${resourceType} kann nicht bearbeitet werden.`
    },
    en: defaultStrings,
    fr: {
      insertDrawing: "Ins\xE9rer un dessin",
      insertDrawingInNewWindow: "Ins\xE9rer un dessin dans une nouvelle fen\xEAtre",
      restoreFromAutosave: "Restaurer depuis la sauvegarde automatique",
      deleteAutosave: "Supprimer toutes les sauvegardes automatiques",
      noSuchAutosaveExists: "Aucune sauvegarde automatique n\u2019existe",
      discardChanges: "Ignorer les modifications",
      defaultImageTitle: "Dessin \xE0 main lev\xE9e",
      edit: "Modifier",
      close: "Fermer",
      saveAndClose: "Enregistrer et fermer",
      overwriteExisting: "\xC9craser l\u2019existant",
      saveAsNewDrawing: "Enregistrer comme nouveau dessin",
      clickBelowToContinue: "Termin\xE9 ! Cliquez ci-dessous pour continuer.",
      discardUnsavedChanges: "Ignorer les modifications non enregistr\xE9es ?",
      resumeEditing: "Reprendre l\u2019\xE9dition",
      saveAndResumeEditing: "Enregistrer et continuer l\u2019\xE9dition",
      saveChanges: "Enregistrer les modifications",
      exitInstructions: "Toutes les modifications sont enregistr\xE9es. Cliquez ci-dessous pour quitter.",
      settingsPaneDescription: "Param\xE8tres pour l\u2019\xE9diteur de dessin.",
      setting__disableFullScreen: "Mode dialogue",
      setting__disableFullScreenDescription: "Lorsque cette option est activ\xE9e, l\u2019\xE9diteur ne remplit que partiellement la fen\xEAtre Joplin.",
      setting__autosaveIntervalSettingLabel: "Intervalle de sauvegarde automatique (minutes)",
      setting__autosaveIntervalSettingDescription: "D\xE9finit la fr\xE9quence de cr\xE9ation des sauvegardes automatiques du dessin courant.",
      setting__themeLabel: "Th\xE8me",
      setting__toolbarTypeLabel: "Type de barre d\u2019outils",
      setting__toolbarTypeDescription: "Cette option permet de changer l\u2019interface de la barre d\u2019outils de l\u2019\xE9diteur.",
      setting__keyboardShortcuts: "Raccourcis clavier",
      toolbarTypeDefault: "Par d\xE9faut",
      toolbarTypeSidebar: "Barre lat\xE9rale",
      toolbarTypeDropdown: "Menu d\xE9roulant",
      styleMatchJoplin: "Identique \xE0 Joplin",
      styleJsDrawLight: "Clair",
      styleJsDrawDark: "Sombre",
      images: "Images",
      pdfs: "PDF",
      allFiles: "Tous les fichiers",
      loadLargePdf: (pageCount) => `Le fichier s\xE9lectionn\xE9 est un PDF volumineux (${pageCount} pages). Son chargement peut prendre du temps et augmenter la taille du dessin. Continuer ?`,
      notAnEditableImage: (resourceId, resourceType) => `La ressource ${resourceId} n\u2019est pas une image modifiable. Impossible de modifier une ressource de type ${resourceType}.`
    },
    es: {
      insertDrawing: "A\xF1ada dibujo",
      restoreFromAutosave: "Resturar al autoguardado",
      deleteAutosave: "Borrar el autoguardado",
      noSuchAutosaveExists: "No autoguardado existe",
      discardChanges: "Descartar cambios",
      defaultImageTitle: "Dibujo",
      edit: "Editar",
      close: "Cerrar",
      saveAndClose: "Guardar y cerrar",
      overwriteExisting: "Sobrescribir existente",
      saveAsNewDrawing: "Guardar como dibujo nuevo",
      clickBelowToContinue: "Guardado. Ponga \xABok\xBB para continuar.",
      discardUnsavedChanges: "\xBFDescartar cambios no guardados?",
      resumeEditing: "Continuar editando",
      saveAndResumeEditing: "Guardar y continuar editando"
    },
    hr: {
      insertDrawing: "Umetni crte\u017E",
      insertDrawingInNewWindow: "Umetni crte\u017E u novom prozoru",
      restoreFromAutosave: "Obnovi iz automatski spremljenog crte\u017Ea",
      deleteAutosave: "Izbri\u0161i sve automatski spremljene crte\u017Ee",
      noSuchAutosaveExists: "Ne postoji automatski spremljeni crte\u017E",
      discardChanges: "Odbaci promjene",
      defaultImageTitle: "Prostoru\u010Dni crte\u017E",
      edit: "Uredi",
      close: "Zatvori",
      saveAndClose: "Spremi i zatvori",
      overwriteExisting: "Prepi\u0161i postoje\u0107e",
      saveAsNewDrawing: "Spremi kao novi crte\u017E",
      clickBelowToContinue: "Gotovo! Klikni dolje za nastavak.",
      discardUnsavedChanges: "Odbaciti nespremljene promjene?",
      resumeEditing: "Nastavi ure\u0111ivati",
      saveAndResumeEditing: "Spremi i nastavi ure\u0111ivati",
      saveChanges: "Spremi promjene",
      exitInstructions: "Sve promjene su spremljene! Klikni dolje za izlaz.",
      settingsPaneDescription: "Postavke ure\u0111iva\u010Da crte\u017Ea.",
      setting__disableFullScreen: "Modus dijaloga",
      setting__disableFullScreenDescription: "Uklju\u010Divanjem ove postavke \u0107e ure\u0111iva\u010D ispuniti samo dio Joplinovog prozora.",
      setting__autosaveIntervalSettingLabel: "Interval automatskog spremanja (minute)",
      setting__autosaveIntervalSettingDescription: "Prilago\u0111ava u\u010Destalost stvaranja sigurnosnih kopija trenuta\u010Dnog crte\u017Ea. Najnoviji automatski spremljeni crte\u017E se mo\u017Ee obnoviti pretra\u017Eivanjem \u201E:restore autosave\u201D u paleti naredbi (ctrl+shift+p ili cmd+shift+p na MacOS-u) i klikom na \u201EObnovi iz automatski spremljenog crte\u017Ea\u201D. Ako je ova postavka postavljena na nulu, automatska spremanja se izvode svake dvije minute.",
      setting__themeLabel: "Tema",
      setting__toolbarTypeLabel: "Vrsta alatne trake",
      setting__toolbarTypeDescription: "Ova postavka omogu\u0107uje prebacivanje izme\u0111u mogu\u0107ih korisni\u010Dkih su\u010Delja alatnih traka za ure\u0111iva\u010D slika.",
      setting__keyboardShortcuts: "Tipkovni pre\u010Daci",
      toolbarTypeDefault: "Zadano",
      toolbarTypeSidebar: "Bo\u010Dna traka",
      toolbarTypeDropdown: "Padaju\u0107i izbornik",
      styleMatchJoplin: "Uskladi s Joplinom",
      styleJsDrawLight: "Svijetla",
      styleJsDrawDark: "Tamna",
      images: "Slike",
      pdfs: "PDF-ovi",
      allFiles: "Sve datoteke",
      loadLargePdf: (pageCount) => `Jedna odabrana datoteka je veliki PDF (${pageCount} stranica). U\u010Ditavanje mo\u017Ee potrajati i pove\u0107ati veli\u010Dinu trenuta\u010Dnog crte\u017Ea. \u017Deli\u0161 li nastaviti?`,
      notAnEditableImage: (resourceId, resourceType) => `Resurs ${resourceId} nije slika koja se mo\u017Ee ure\u0111ivati. Nije mogu\u0107e urediti resurs vrste ${resourceType}.`
    },
    ro: {
      insertDrawing: "Insereaz\u0103 un desen",
      insertDrawingInNewWindow: "Insereaz\u0103 un desen \xEEntr-o fereastr\u0103 nou\u0103",
      restoreFromAutosave: "Restaureaz\u0103 dintr-un desen salvat automat",
      deleteAutosave: "\u0218terge toate desenele salvate automat",
      noSuchAutosaveExists: "Nicio salvare automat\u0103 nu exist\u0103",
      discardChanges: "Anuleaz\u0103 modific\u0103rile",
      defaultImageTitle: "Desen liber",
      edit: "Editeaz\u0103",
      close: "\xCEnchide",
      saveAndClose: "Salveaz\u0103 \u0219i \xEEnchide",
      overwriteExisting: "Suprascrie existent",
      saveAsNewDrawing: "Salveaz\u0103 ca desen nou",
      clickBelowToContinue: "Gata! F\u0103 clic mai jos pentru a continua.",
      discardUnsavedChanges: "Anulezi modific\u0103rile nesalvate?",
      resumeEditing: "Continu\u0103 editarea",
      saveAndResumeEditing: "Salveaz\u0103 \u0219i continu\u0103 editarea",
      saveChanges: "Salveaz\u0103 modific\u0103rile",
      exitInstructions: "Toate modific\u0103rile au fost salvate! F\u0103 clic mai jos pentru a ie\u0219i.",
      settingsPaneDescription: "Set\u0103ri pentru editorul de imagine liber.",
      setting__disableFullScreen: "Mod dialog",
      setting__disableFullScreenDescription: "Activarea acestei op\u021Biuni face ca editorul s\u0103 acopere doar par\u021Bial fereastra Joplin.",
      setting__autosaveIntervalSettingLabel: "Interval salvare automat\u0103 (minute)",
      setting__autosaveIntervalSettingDescription: 'Ajusteaz\u0103 c\xE2t de des se face o copie de siguran\u021B\u0103 a desenului curent. Cea mai recent\u0103 versiune salvat\u0103 automat poate fi restaurat\u0103 c\u0103ut\xE2nd dup\u0103 ":restore autosave" \xEEn paleta de comenzi (Ctrl+Shift+P sau Cmd+Shift+P pe MacOS) \u0219i f\u0103c\xE2nd clic pe \u201ERestaureaz\u0103 dintr-un desen salvat automat\u201D. Dac\u0103 acest\u0103 setare este 0, salv\u0103rile automate sunt create la fiecare 2 minute.',
      setting__themeLabel: "Tem\u0103",
      setting__toolbarTypeLabel: "Tip bar\u0103 de instrumente",
      setting__toolbarTypeDescription: "Aceast\u0103 setare comut\u0103 \xEEntre posibilele interfe\u021Be pentru editorul de imagine.",
      setting__keyboardShortcuts: "Scurt\u0103turi de la tastatur\u0103",
      toolbarTypeDefault: "Implicit",
      toolbarTypeSidebar: "Bar\u0103 lateral\u0103",
      toolbarTypeDropdown: "Casete derulante",
      styleMatchJoplin: "La fel ca Joplin",
      styleJsDrawLight: "Luminoas\u0103",
      styleJsDrawDark: "\xCEntunecat\u0103",
      images: "Imagini",
      pdfs: "PDF-uri",
      allFiles: "Toate fi\u0219ierele",
      loadLargePdf: (pageCount) => `Un fi\u0219ier PDF selectat este un fi\u0219ier mare (${pageCount} de pagini). \xCEnc\u0103rcarea lui ar putea dura ceva timp \u0219i s\u0103 creasc\u0103 dimensiunea desenului curent. Continui?`,
      notAnEditableImage: (resourceId, resourceType) => `Resursa ${resourceId} nu este o imagine editabil\u0103. Nu se poate edita resursa de tipul ${resourceType}.`
    },
    sk: {
      insertDrawing: "Vlo\u017Ei\u0165 kresbu",
      insertDrawingInNewWindow: "Vlo\u017Ei\u0165 kresbu do nov\xE9ho okna",
      restoreFromAutosave: "Obnovi\u0165 z automaticky ulo\u017Eenej kresby",
      deleteAutosave: "Vymaza\u0165 v\u0161etky automaticky ulo\u017Een\xE9 kresby",
      noSuchAutosaveExists: "Neexistuj\xFA \u017Eiadne automaticky ulo\u017Een\xE9",
      discardChanges: "Zru\u0161i\u0165 zmeny",
      defaultImageTitle: "Kresba vo\u013Enou rukou",
      edit: "Upravi\u0165",
      close: "Zavrie\u0165",
      saveAndClose: "Ulo\u017Ei\u0165 a zavrie\u0165",
      overwriteExisting: "Prep\xEDsa\u0165 existuj\xFAcu",
      saveAsNewDrawing: "Ulo\u017Ei\u0165 ako nov\xFA kresbu",
      clickBelowToContinue: "Hotovo! Kliknite ni\u017E\u0161ie pre pokra\u010Dovanie.",
      discardUnsavedChanges: "Zru\u0161i\u0165 neulo\u017Een\xE9 zmeny?",
      resumeEditing: "Pokra\u010Dova\u0165 v \xFAprave",
      saveAndResumeEditing: "Ulo\u017Ei\u0165 a pokra\u010Dova\u0165 v \xFAprav\xE1ch",
      saveChanges: "Ulo\u017Ei\u0165 zmeny",
      exitInstructions: "V\u0161etky zmeny boli ulo\u017Een\xE9! Kliknite ni\u017E\u0161ie pre ukon\u010Denie.",
      settingsPaneDescription: "Nastavenia pre grafick\xFD editor Kresba vo\u013Enou rukou.",
      setting__disableFullScreen: "Dial\xF3gov\xFD re\u017Eim",
      setting__disableFullScreenDescription: "Aktiv\xE1cia tohto nastavenia sp\xF4sob\xED, \u017Ee editor vypln\xED okno Joplin len \u010Diasto\u010Dne.",
      setting__autosaveIntervalSettingLabel: "Interval automatick\xE9ho ukladania (v min\xFAtach)",
      setting__autosaveIntervalSettingDescription: "Nastav\xED, ako \u010Dasto sa vytv\xE1ra z\xE1lo\u017En\xE1 k\xF3pia aktu\xE1lnej kresby. Posledn\xE9 automatick\xE9 ulo\u017Eenie je mo\u017En\xE9 obnovi\u0165 vyh\u013Eadan\xEDm \u201E:restore autosave\u201C v palete pr\xEDkazov (ctrl+shift+p alebo cmd+shift+p v syst\xE9me MacOS) a kliknut\xEDm na \u201EObnovi\u0165 z automaticky ulo\u017Eenej kresby\u201C. Ak je toto nastavenie nastaven\xE9 na nulu, automatick\xE9 ulo\u017Eenia sa vytv\xE1raj\xFA ka\u017Ed\xE9 dve min\xFAty.",
      setting__themeLabel: "T\xE9ma",
      setting__toolbarTypeLabel: "Typ panela n\xE1strojov",
      setting__toolbarTypeDescription: "Toto nastavenie prep\xEDna medzi mo\u017En\xFDmi pou\u017E\xEDvate\u013Esk\xFDmi rozhraniami panela n\xE1strojov pre grafick\xFD editor.",
      setting__keyboardShortcuts: "Kl\xE1vesov\xE9 skratky",
      toolbarTypeDefault: "Predvolen\xE9",
      toolbarTypeSidebar: "Bo\u010Dn\xFD panel",
      toolbarTypeDropdown: "Rozba\u013Eovacie menu",
      styleMatchJoplin: "Rovnak\xE1 ako Joplin",
      styleJsDrawLight: "Svetl\xE1",
      styleJsDrawDark: "Tmav\xE1",
      images: "Obr\xE1zky",
      pdfs: "PDF s\xFAbory",
      allFiles: "V\u0161etky s\xFAbory",
      loadLargePdf: (pageCount) => `Vybran\xFD s\xFAbor je ve\u013Ek\xFD PDF s\xFAbor (${pageCount} str\xE1n). Jeho na\u010D\xEDtanie m\xF4\u017Ee trva\u0165 nejak\xFD \u010Das a zv\xFD\u0161i\u0165 ve\u013Ekos\u0165 aktu\xE1lnej kresby. Pokra\u010Dova\u0165?`,
      notAnEditableImage: (resourceId, resourceType) => `Zdroj ${resourceId} nie je upravite\u013En\xFD obr\xE1zok. Nie je mo\u017En\xE9 upravi\u0165 zdroj typu ${resourceType}.`
    }
  };
  var localization;
  var supportedLanguages = [];
  var setLocaleInternal = (supportedLocales) => {
    const languages = [...supportedLocales];
    for (let language of supportedLocales) {
      language = language.replace("_", "-");
      const localeSep = language.indexOf("-");
      if (localeSep !== -1) {
        languages.push(language.substring(0, localeSep));
      }
    }
    for (const locale of languages) {
      if (locale in localizations) {
        localization = localizations[locale];
        break;
      }
    }
    supportedLanguages = languages;
  };
  var localizationSet = false;
  var setLocale = (supportedLocales) => {
    if (typeof supportedLocales === "string") {
      supportedLocales = [supportedLocales];
    }
    setLocaleInternal(supportedLocales);
    localizationSet = true;
  };
  setLocale(navigator.languages);
  var localization_default = new Proxy(defaultStrings, {
    get(_target, prop) {
      if (!localizationSet) {
        console.warn(
          "Accessing language data without a localization set. The default Electron locale will be used."
        );
      }
      const propAsKey = prop;
      return localization?.[propAsKey] ?? defaultStrings[propAsKey];
    }
  });

  // src/constants.ts
  var markdownItContentScriptId = "jsdraw__markdownIt_editDrawingButton";

  // src/contentScripts/utils/makeImageEditable.ts
  var hasFocus = (element) => {
    return element.contains(document.activeElement);
  };
  var onEdit = (image) => {
    if (!(image instanceof HTMLElement)) {
      image = image.currentTarget;
    }
    const message = `edit:${image.getAttribute("src")}`;
    webviewApi.postMessage(markdownItContentScriptId, message).catch((err) => {
      console.error("Error posting message!", err, "\nMessage: ", message);
    });
  };
  var makeImageEditable = (image, editLabel) => {
    if (image.classList.contains("js-draw--skip")) return;
    if (image.ondblclick === onEdit) return;
    image.ondblclick = onEdit;
    const addEditButton = () => {
      const editButtonContainer = document.createElement("span");
      const editButton = document.createElement("button");
      const updateLabel = (label) => {
        editButton.textContent = `${label} \u{1F58A}\uFE0F`;
      };
      editButton.ariaDescribedByElements = [image];
      editButtonContainer.classList.add("jsdraw--editButton");
      editButtonContainer.appendChild(editButton);
      updateLabel("Edit");
      void (async () => {
        updateLabel(await editLabel);
      })();
      image.insertAdjacentElement("afterend", editButtonContainer);
      const pointerSet = /* @__PURE__ */ new Set();
      const updateVisibleState = () => {
        const show = pointerSet.size > 0 || editButton.querySelector(":hover, :focus") || hasFocus(editButton) || hasFocus(image);
        if (show) {
          editButtonContainer.classList.add("-show");
        } else {
          editButtonContainer.classList.remove("-show");
        }
      };
      const updatePositioning = () => {
        const containerBox = editButtonContainer.getBoundingClientRect();
        const imageBox = image.getBoundingClientRect();
        editButton.style.right = `${imageBox.right - containerBox.right}px`;
        editButton.style.top = `${imageBox.top - containerBox.top}px`;
      };
      image.addEventListener("pointerenter", (event) => {
        pointerSet.add(event.pointerId);
        updateVisibleState();
        updatePositioning();
      });
      image.addEventListener("pointerleave", (event) => {
        pointerSet.delete(event.pointerId);
        updateVisibleState();
      });
      for (const item of [image, editButton]) {
        item.addEventListener("focus", () => {
          updateVisibleState();
          updatePositioning();
        });
        item.addEventListener("blur", () => {
          requestAnimationFrame(() => {
            updateVisibleState();
          });
        });
      }
      editButton.onclick = () => {
        onEdit(image);
      };
    };
    const isRichTextEditor = document.body.classList.contains("mce-content-body") || document.body.id === "tinymce";
    const hasWebViewApi = typeof webviewApi !== "undefined";
    const isHtmlNote = !document.body.querySelector("#rendered-md");
    if (isRichTextEditor || isHtmlNote) {
      image.style.cursor = "pointer";
    } else if (hasWebViewApi) {
      addEditButton();
    }
  };
  var makeImageEditable_default = makeImageEditable;

  // src/contentScripts/markdownIt-content.ts
  var initLocalePromise = null;
  var initLocale = async () => {
    if (initLocalePromise) {
      return initLocalePromise;
    }
    const promise = (async () => {
      const languages = await webviewApi.postMessage(markdownItContentScriptId, "get-locale:");
      if (!Array.isArray(languages)) {
        throw new Error(
          `Invalid locale request response. Not an array: ${JSON.stringify(languages)}`
        );
      }
      setLocale(languages);
    })();
    initLocalePromise = promise;
    return promise;
  };
  var processImages = () => {
    const images = document.querySelectorAll('img[src*=".svg"]');
    for (const image of images) {
      if (image.src.match(/^https?:/) || !image.src.match(/[a-z0-9]{32}[.]svg([?]t=\d+)?$/)) {
        continue;
      }
      makeImageEditable_default(
        image,
        (async () => {
          await initLocale();
          return localization_default.edit;
        })()
      );
    }
  };
  document.addEventListener("joplin-noteDidUpdate", () => {
    processImages();
  });
  processImages();
})();
