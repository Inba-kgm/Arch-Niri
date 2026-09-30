var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// api/index.ts
var api_default = joplin;

// src/autosave.ts
var path = require("path");
var fs = api_default.require("fs-extra");
var getAutosaveDir = async () => {
  const dataDir = await api_default.plugins.dataDir();
  const autosavePath = path.join(dataDir, "autosaves");
  return autosavePath;
};
var makeAutosaveDir = async () => {
  const autosavePath = await getAutosaveDir();
  if (!await fs.pathExists(autosavePath)) {
    await fs.mkdir(autosavePath);
  }
  return autosavePath;
};
var autosaveFilename = "autosave.svg";
var autosave = async (data) => {
  const autosaveDir = await makeAutosaveDir();
  await fs.writeFile(path.join(autosaveDir, autosaveFilename), data);
};
var clearAutosave = async () => {
  const autosavePath = await getAutosaveDir();
  if (await fs.pathExists(autosavePath)) {
    await fs.remove(autosavePath);
  }
};
var hasAutosave = async () => {
  const autosavePath = await getAutosaveDir();
  if (await fs.pathExists(path.join(autosavePath, autosaveFilename))) {
    return true;
  }
  return false;
};
var getAutosave = async () => {
  if (await hasAutosave()) {
    const autosavePath = await getAutosaveDir();
    const data = await fs.readFile(path.join(autosavePath, autosaveFilename), "utf-8");
    return data;
  }
  return null;
};

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
var getLocales = () => {
  return [...supportedLanguages];
};
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

// src/TemporaryDirectory.ts
var import_os = require("os");
var path2 = __toESM(require("path"), 1);
var fs2 = api_default.require("fs-extra");
var appTmpDirectories = [];
var TemporaryDirectory = class _TemporaryDirectory {
  constructor(path3) {
    this.path = path3;
    this.fileIdCounter = 0;
    appTmpDirectories.push(this);
  }
  fileIdCounter;
  // Returns a new path to a temporary file in this directory.
  // [fileExtension], if given, should include the leading '.'.
  nextFilepath(fileExtension = "") {
    if (this.path === null) {
      throw new Error("Temporary directory does not exist. Possible use after destroySync.");
    }
    if (!fileExtension.startsWith(".")) {
      fileExtension = `.${fileExtension}`;
    }
    this.fileIdCounter++;
    return path2.join(this.path, `tmp${this.fileIdCounter}${fileExtension ?? ""}`);
  }
  async newFile(data, fileExtension = "") {
    const path3 = this.nextFilepath(fileExtension);
    const file = await fs2.open(path3, "w");
    await fs2.writeFile(file, data);
    await fs2.close(file);
    return path3;
  }
  // Destroys this directory and all files it contains
  destroySync() {
    if (this.path) {
      fs2.rmSync(this.path, { recursive: true });
      this.path = null;
    }
  }
  static async create() {
    const prefix = "joplin-js-draw";
    const directoryPath = await fs2.mkdtemp(path2.join((0, import_os.tmpdir)(), prefix));
    return new _TemporaryDirectory(directoryPath);
  }
};
var cleanTempDirs = () => {
  for (const dir of appTmpDirectories) {
    dir.destroySync();
  }
};
if (typeof window !== "undefined") {
  window.addEventListener("beforeunload", () => {
    cleanTempDirs();
  });
} else {
  process.on("exit", () => {
    cleanTempDirs();
  });
}

// src/constants.ts
var pluginPrefix = "jop-freehand-drawing-jsdraw-plugin-";
var markdownItContentScriptId = "jsdraw__markdownIt_editDrawingButton";

// src/util/promptForImages.ts
var import_path = require("path");

// src/util/isVersionGreater.ts
var isVersionGreater = (a, b) => {
  const versionRegex = /^(\d+)\.(\d+)\.(\d+)(-.*)?$/;
  const parsedVersionA = versionRegex.exec(a);
  const parsedVersionB = versionRegex.exec(b);
  if (!parsedVersionA || !parsedVersionB) {
    console.warn(
      `Invalid version, ${parsedVersionA} or ${parsedVersionB} (expected number.number.number).`
    );
    return false;
  }
  const majorA = parseInt(parsedVersionA[1]);
  const minorA = parseInt(parsedVersionA[2]);
  const patchA = parseInt(parsedVersionA[3]);
  const majorB = parseInt(parsedVersionB[1]);
  const minorB = parseInt(parsedVersionB[2]);
  const patchB = parseInt(parsedVersionB[3]);
  return majorA > majorB || majorA === majorB && (minorA > minorB || minorA === minorB && patchA > patchB);
};
var isVersionGreater_default = isVersionGreater;

// src/util/promptForImages.ts
var { remove } = api_default.require("fs-extra");
var nextTaskId = 0;
var runningTasks = /* @__PURE__ */ new Map();
var cleanUpTaskResultCallbacks = /* @__PURE__ */ new Map();
var shouldLoadLargePdf = async (pageCount) => {
  if (pageCount < 20) return true;
  const dialogResult = await api_default.views.dialogs.showMessageBox(
    localization_default.loadLargePdf(pageCount)
  );
  const okIndex = 0;
  return dialogResult === okIndex;
};
var getFilters = async () => {
  const filters = [{ name: localization_default.images, extensions: ["jpeg", "jpg", "png", "gif"] }];
  const supportsPdf = isVersionGreater_default((await api_default.versionInfo())?.version, "3.0.2");
  if (supportsPdf) {
    filters.push({ name: localization_default.pdfs, extensions: ["pdf"] });
  }
  filters.push({ name: localization_default.allFiles, extensions: ["*"] });
  return filters;
};
var promptForImages = (tempDir) => {
  const taskId = nextTaskId++;
  let cancelled = false;
  const taskRecord = {
    id: taskId,
    cancel: () => {
      cancelled = true;
    },
    task: (async () => {
      const cleanUpTasks = [];
      try {
        const filePaths = await api_default.views.dialogs.showOpenDialog({
          properties: ["openFile", "multiSelections"],
          filters: await getFilters()
        });
        if (!filePaths) {
          return null;
        }
        const images = [];
        for (const path3 of filePaths) {
          if (cancelled) return null;
          if ((0, import_path.extname)(path3).toLowerCase() === ".pdf") {
            const pdfInfo = await api_default.imaging.getPdfInfoFromPath(path3);
            if (!await shouldLoadLargePdf(pdfInfo.pageCount)) {
              cancelled = true;
              return null;
            }
            const pageHandles = [];
            const step = 30;
            for (let i = 0; i <= pdfInfo.pageCount; i += step) {
              const minPage = i + 1;
              const maxPage = Math.min(pdfInfo.pageCount, i + step);
              const handles = await api_default.imaging.createFromPdfPath(path3, { minPage, maxPage });
              pageHandles.push(...handles);
              if (cancelled) return null;
            }
            for (const handle of pageHandles) {
              if (cancelled) return null;
              const pdfPagePath = tempDir.nextFilepath(".jpg");
              await api_default.imaging.toJpgFile(handle, pdfPagePath);
              images.push({
                path: pdfPagePath,
                name: (0, import_path.basename)(pdfPagePath),
                mime: "image/jpeg"
              });
              cleanUpTasks.push(async () => {
                await remove(pdfPagePath);
                console.info("clean up: removed", pdfPagePath);
              });
            }
          } else {
            images.push({ path: path3, name: (0, import_path.basename)(path3) });
          }
        }
        return images;
      } finally {
        runningTasks.delete(taskId);
        cleanUpTaskResultCallbacks.set(taskId, () => {
          for (const task of cleanUpTasks) {
            void task();
          }
        });
      }
    })()
  };
  runningTasks.set(taskId, taskRecord);
  return taskRecord;
};
var taskById = (id) => {
  return runningTasks.get(id);
};
var cleanUpTaskResult = (taskId) => {
  const cleanUpCallback = cleanUpTaskResultCallbacks.get(taskId);
  if (cleanUpCallback) {
    cleanUpCallback();
    cleanUpTaskResultCallbacks.delete(taskId);
  }
};
var promptForImages_default = promptForImages;

// src/util/htmlUtil.ts
var escapeHtml = (html) => {
  return html.replace(/[&]/g, "&amp;").replace(/[<]/g, "&lt;").replace(/[>]/g, "&gt;").replace(/["]/g, "&quot;").replace(/[']/g, "&#39;");
};

// src/dialog/AbstractDrawingView.ts
var AbstractDrawingView = class {
  constructor(tempDir) {
    this.tempDir = tempDir;
  }
  #autosaveInterval = 120 * 1e3;
  // ms
  #toolbarType = 0 /* Default */;
  #styleMode = "match-joplin-theme" /* MatchJoplin */;
  #keybindings = /* @__PURE__ */ Object.create(null);
  #open = false;
  isOpen() {
    return this.#open;
  }
  /** Resets the dialog prior to use. This can be called multiple times. */
  async initializeDialog() {
    const locale = await api_default.settings.globalValue("locale");
    await this.setHtml(
      [`<input type='hidden' value='${escapeHtml(locale)}' id='default-locale-data'/>`].join("\n")
    );
    await this.setDialogButtons([{ id: "cancel" }]);
    await this.addScript("./dialog/webview/webview.js");
    await this.addScript("./dialog/webview/webview.css");
  }
  /** Sets the autosave interval in milliseconds. Takes effect on the next editor launch. */
  setAutosaveInterval(interval) {
    this.#autosaveInterval = interval;
  }
  /** Sets the toolbar to be displayed in the dialog. Takes effect on the next editor launch. */
  setToolbarType(type) {
    this.#toolbarType = type;
  }
  /** Changes the editor's style. Takes effect on the next launch of the editor. */
  setStyleMode(style) {
    this.#styleMode = style;
  }
  /** Sets the keyboard shortcuts. Takes effect when the editor is next launched. */
  setKeyboardShortcuts(keybindings) {
    for (const id in keybindings) {
      this.#keybindings[id] = [...keybindings[id]];
    }
  }
  /** Sets whether the view can be fullscreened (not used by all implementations) */
  setCanFullscreen(_enabled) {
  }
  /**
   * Displays a dialog that allows the user to insert a drawing.
   *
   * @returns true if the drawing was saved at least once.
   */
  async promptForDrawing(options) {
    await this.initializeDialog();
    let saveOption = options.initialSaveMethod ?? null;
    let didSave = false;
    if (!options.saveCallbacks.saveAsNew) {
      saveOption = "overwrite" /* Overwrite */;
    }
    const save = async (data) => {
      try {
        if (saveOption === "saveAsNew" /* SaveAsNew */) {
          if (options.saveCallbacks.saveAsNew) {
            await options.saveCallbacks.saveAsNew(data);
          } else {
            throw new Error("saveAsNew save callback not defined");
          }
        } else if (saveOption === "overwrite" /* Overwrite */) {
          await options.saveCallbacks.overwrite(data);
        } else {
          throw new Error("saveOption must be either saveAsNew or overwrite");
        }
        this.postMessage({
          type: "saveCompleted" /* SaveCompleted */
        });
        didSave = true;
      } catch (error) {
        console.error("js-draw", error);
        alert("Not saved: " + error);
      }
    };
    const result = new Promise((resolve2, reject) => {
      let saveData = null;
      this.onMessage(async (message) => {
        if (message.type === "saveSVG" && !saveOption) {
          saveData = message.data;
          this.setDialogButtons([
            {
              id: "ok",
              title: localization_default.saveAndClose
            }
          ]);
          return {
            type: "saveResponse" /* SaveResponse */,
            waitingForSaveType: true
          };
        } else if (message.type === "saveSVG" && saveOption) {
          void save(message.data);
          saveData = null;
          return {
            type: "saveResponse" /* SaveResponse */,
            waitingForSaveType: false
          };
        } else if (message.type === "setSaveMethod" /* SetSaveMethod */) {
          saveOption = message.method;
        } else if (message.type === "getInitialData" /* GetInitialData */) {
          this.setDialogButtons([]);
          return {
            type: "initialDataResponse" /* InitialDataResponse */,
            autosaveIntervalMS: this.#autosaveInterval,
            toolbarType: this.#toolbarType,
            initialData: options.initialData,
            styleMode: this.#styleMode,
            keyboardShortcuts: this.#keybindings
          };
        } else if (message.type === "showCloseButton" /* ShowCloseButton */) {
          this.setDialogButtons([
            {
              id: message.isSaved ? "ok" : "cancel",
              title: message.isSaved ? localization_default.close : localization_default.discardChanges
            }
          ]);
        } else if (message.type === "removeButtons" /* HideButtons */) {
          this.setDialogButtons([]);
          saveData = null;
        } else if (message.type === "autosaveSVG" /* AutosaveSVG */) {
          void clearAutosave().then(() => {
            void autosave(message.data);
          });
        } else if (message.type === "showImagePicker" /* ShowImagePicker */) {
          const task = promptForImages_default(this.tempDir);
          return {
            type: "imagePickerStartedResponse" /* ImagePickerTaskResponse */,
            taskId: task.id
          };
        } else if (message.type === "cancelImagePicker" /* CancelImagePicker */) {
          const task = taskById(message.taskId);
          if (task) task.cancel();
          return true;
        } else if (message.type === "getImagePicker" /* GetImagePickerResult */) {
          const task = taskById(message.taskId);
          if (task) {
            const images = await task.task;
            return {
              type: "imagePickerResponse" /* ImagePickerResponse */,
              images
            };
          } else {
            throw new Error(`No such task: ${message.taskId}`);
          }
          return true;
        } else if (message.type === "cleanUpImagePicker" /* CleanUpImagePickerResult */) {
          cleanUpTaskResult(message.taskId);
          return true;
        }
        return true;
      });
      this.#open = true;
      this.showDialog().then(async (result2) => {
        this.#open = false;
        if (saveData && result2.id === "ok") {
          saveOption ??= result2.formData?.saveOptions?.saveOption ?? "saveAsNew" /* SaveAsNew */;
          await save(saveData);
          resolve2(true);
        } else if (!saveData || result2.id === "cancel") {
          resolve2(didSave);
        } else {
          reject(`Unknown button ID ${result2.id}`);
        }
      });
    });
    return await result;
  }
};

// src/dialog/DrawingDialog.ts
var dialogs = api_default.views.dialogs;
var dialogCounter = 0;
var DrawingDialog = class _DrawingDialog extends AbstractDrawingView {
  handle;
  canFullscreen = false;
  constructor(handle, tempDir) {
    super(tempDir);
    this.handle = handle;
  }
  static create(tempDir) {
    const handlePromise = dialogs.create(`${pluginPrefix}jsDrawDialog-${dialogCounter++}`);
    return new _DrawingDialog(handlePromise, tempDir);
  }
  async initializeDialog() {
    await super.initializeDialog();
    const handle = await this.handle;
    await dialogs.setFitToContent(handle, false);
  }
  /**
   * Sets whether this dialog is automatically set to fullscreen mode when the
   * editor is visible.
   */
  async setCanFullscreen(canFullscreen) {
    if (this.canFullscreen === canFullscreen) {
      return;
    }
    this.canFullscreen = canFullscreen;
    const installationDir = await api_default.plugins.installationDir();
    const cssFile = canFullscreen ? "dialogFullscreen.css" : "dialogNonfullscreen.css";
    await api_default.window.loadChromeCssFile(installationDir + "/dialog/userchromeStyles/" + cssFile);
  }
  /**
   * Sets the buttons visible at the bottom of the dialog and toggles fullscreen if necessary (to ensure the buttons)
   * are visible.
   */
  async setDialogButtons(buttons) {
    const handle = await this.handle;
    await dialogs.setButtons(handle, buttons);
  }
  async setHtml(html) {
    await dialogs.setHtml(await this.handle, html);
  }
  async addScript(path3) {
    await dialogs.addScript(await this.handle, path3);
  }
  async postMessage(message) {
    api_default.views.panels.postMessage(await this.handle, message);
  }
  async onMessage(onMessageHandler) {
    api_default.views.panels.onMessage(await this.handle, onMessageHandler);
  }
  async showDialog() {
    return dialogs.open(await this.handle);
  }
};

// src/dialog/DrawingWindow.ts
var import_path2 = require("path");
var DrawingWindow = class extends AbstractDrawingView {
  win = void 0;
  eventListener;
  onCloseListener = (_result) => {
  };
  async getBaseURL() {
    const installationDir = await api_default.plugins.installationDir();
    return `file://${import_path2.posix.normalize(installationDir)}/dialog/window/index.html`;
  }
  messageOrigin = void 0;
  async getMessageOrigin() {
    this.messageOrigin ??= new URL(await this.getBaseURL()).origin;
    return this.messageOrigin;
  }
  async addScript(path3) {
    const scriptPath = (0, import_path2.resolve)(await api_default.plugins.installationDir(), path3);
    this.win?.postMessage({ kind: "addScript", src: scriptPath }, await this.getMessageOrigin());
  }
  async setHtml(html) {
    this.win?.postMessage({ kind: "setHtml", html }, await this.getMessageOrigin());
  }
  async setDialogButtons(buttons) {
    this.win?.postMessage({ kind: "setButtons", buttons }, await this.getMessageOrigin());
  }
  async postMessage(message) {
    if (this.win) {
      this.win.postMessage({ message }, await this.getMessageOrigin());
    }
  }
  onMessage(onMessageHandler) {
    if (!this.win) {
      this.eventListener = onMessageHandler;
    } else {
      this.win?.addEventListener("message", async (event) => {
        if (event.origin !== await this.getMessageOrigin()) {
          return;
        }
        const id = event.data.id;
        if (id) {
          const response = await onMessageHandler(event.data.message);
          console.log(event.data.message, response);
          this.win?.postMessage({ responseId: id, response });
        } else if (event.data.kind === "dialogResult") {
          this.onCloseListener(event.data.result);
        }
      });
    }
  }
  async showDialog() {
    const installationDir = await api_default.plugins.installationDir();
    const dialog = window.open(
      `file://${import_path2.posix.normalize(installationDir)}/dialog/window/index.html`,
      "_blank",
      "autoHideMenuBar=true"
    );
    this.win = dialog;
    await new Promise((resolve2) => {
      dialog.addEventListener("load", () => resolve2());
    });
    if (this.eventListener) {
      this.onMessage(this.eventListener);
    }
    await super.initializeDialog();
    return new Promise((resolve2) => {
      this.onCloseListener = (result) => resolve2(result);
    });
  }
};

// src/settings.ts
var disableFullscreenKey = "disable-editor-fills-window";
var autosaveIntervalKey = "autosave-interval-minutes";
var toolbarTypeKey = "toolbar-type";
var styleModeKey = "style-mode";
var keyboardShortcutsKey = "keyboard-shortcuts";
var loadSettings = async () => {
  return {
    disableFullscreen: await api_default.settings.value(disableFullscreenKey),
    autosaveInterval: await api_default.settings.value(autosaveIntervalKey),
    toolbarType: await api_default.settings.value(toolbarTypeKey),
    styleMode: await api_default.settings.value(styleModeKey),
    keyboardShortcuts: await api_default.settings.value(keyboardShortcutsKey)
  };
};
var applySettingsTo = (settings, drawingDialog) => {
  let autosaveIntervalMinutes = settings.autosaveInterval;
  if (!autosaveIntervalMinutes) {
    autosaveIntervalMinutes = 2;
  }
  drawingDialog.setAutosaveInterval(autosaveIntervalMinutes * 60 * 1e3);
  drawingDialog.setToolbarType(settings.toolbarType);
  drawingDialog.setStyleMode(settings.styleMode);
  drawingDialog.setKeyboardShortcuts(settings.keyboardShortcuts);
  drawingDialog.setCanFullscreen(!settings.disableFullscreen);
};
var registerSettings = async () => {
  const jsDrawSectionName = "js-draw";
  await api_default.settings.registerSection(jsDrawSectionName, {
    label: "Freehand Drawing",
    iconName: "fas fa-pen-alt",
    description: localization_default.settingsPaneDescription
  });
  await api_default.settings.registerSettings({
    [toolbarTypeKey]: {
      public: true,
      section: jsDrawSectionName,
      advanced: true,
      label: localization_default.setting__toolbarTypeLabel,
      description: localization_default.setting__toolbarTypeDescription,
      isEnum: true,
      type: 1 /* Int */,
      value: 0,
      options: {
        [0 /* Default */]: localization_default.toolbarTypeDefault,
        [1 /* Sidebar */]: localization_default.toolbarTypeSidebar,
        [2 /* Dropdown */]: localization_default.toolbarTypeDropdown
      }
    },
    [styleModeKey]: {
      public: true,
      section: jsDrawSectionName,
      label: localization_default.setting__themeLabel,
      isEnum: true,
      type: 2 /* String */,
      value: "match-joplin-theme" /* MatchJoplin */,
      options: {
        ["match-joplin-theme" /* MatchJoplin */]: localization_default.styleMatchJoplin,
        ["js-draw-default-light" /* JsDrawLight */]: localization_default.styleJsDrawLight,
        ["js-draw-default-dark" /* JsDrawDark */]: localization_default.styleJsDrawDark
      }
    },
    [disableFullscreenKey]: {
      public: true,
      section: jsDrawSectionName,
      advanced: true,
      label: localization_default.setting__disableFullScreen,
      description: localization_default.setting__disableFullScreenDescription,
      storage: 2 /* File */,
      type: 3 /* Bool */,
      value: false
    },
    [autosaveIntervalKey]: {
      public: true,
      section: jsDrawSectionName,
      advanced: true,
      label: localization_default.setting__autosaveIntervalSettingLabel,
      description: localization_default.setting__autosaveIntervalSettingDescription,
      storage: 2 /* File */,
      type: 1 /* Int */,
      value: 2
    },
    [keyboardShortcutsKey]: {
      public: false,
      section: jsDrawSectionName,
      label: localization_default.setting__keyboardShortcuts,
      storage: 2 /* File */,
      type: 5 /* Object */,
      value: {}
    },
    locale: {
      public: false,
      label: "Locale (Internal setting)",
      description: "Mirrors the global joplin.locale setting. This is done to allow the current app locale to be accessed from the renderer.",
      type: 2 /* String */,
      value: ""
    }
  });
  let settings = await loadSettings();
  await api_default.settings.onChange(async (_event) => {
    settings = await loadSettings();
  });
  const syncMirroredSettings = async () => {
    const mirroredSettingKeys = ["locale"];
    for (const key of mirroredSettingKeys) {
      await api_default.settings.setValue(key, await api_default.settings.globalValue(key));
    }
  };
  await syncMirroredSettings();
  return {
    applySettingsTo: (view) => {
      return applySettingsTo(settings, view);
    }
  };
};

// src/Resource.ts
var fs3 = api_default.require("fs-extra");
var Resource = class _Resource {
  tmpdir;
  resourceId;
  mime;
  title;
  fileExt;
  tempfilePath;
  constructor(props) {
    this.tmpdir = props.tmpdir;
    this.resourceId = props.resourceId;
    this.mime = props.mime;
    this.title = props.title;
    this.fileExt = props.fileExt;
    this.tempfilePath = props.tempfilePath ?? null;
  }
  // Fetch file data associated with this resource from the Joplin database
  async getDataAsString(encoding = "utf8") {
    const data = await api_default.data.get(["resources", this.resourceId, "file"]);
    const stringData = Buffer.from(data.body).toString(encoding);
    return stringData;
  }
  async updateData(data) {
    if (this.tempfilePath) {
      await fs3.rm(this.tempfilePath);
      this.tempfilePath = null;
    }
    const tempfilePath = await this.tmpdir.newFile(data, this.fileExt);
    const fileData = [{ path: tempfilePath }];
    const query = null;
    const metadata = {
      mime: this.mime,
      title: this.title,
      updated_time: Date.now(),
      user_updated_time: Date.now(),
      // Remove the leading '.'
      file_extension: this.fileExt ? /^[.]?(.*)$/.exec(this.fileExt)[1] : null
    };
    await api_default.data.put(["resources", this.resourceId], query, metadata, fileData);
    this.tempfilePath = tempfilePath;
  }
  htmlSafeTitle() {
    return escapeHtml(this.title);
  }
  // Given a URL in the form
  // file://.../resourceuuid#dataHere?dataHere
  // or
  // :/resourceuuid
  // returns a Resource representing the content
  // of that URL, **if the resource already exists**.
  // [fileExt] should include the leading '.'.
  static async fromURL(tmpdir2, url, fileExt, mimeType) {
    const fileURLMatch = /^(?:file|joplin[-a-z]+):\/\/.*\/([a-zA-Z0-9]+)[.]\w+(?:[?#]|$)/.exec(url);
    const resourceLinkMatch = /^:\/([a-zA-Z0-9]+)$/.exec(url);
    let resourceId = null;
    if (fileURLMatch) {
      resourceId = fileURLMatch[1];
    } else if (resourceLinkMatch) {
      resourceId = resourceLinkMatch[1];
    } else if (/^[a-z0-9]{32}$/.exec(url)) {
      resourceId = url;
    }
    if (resourceId === null) {
      return null;
    }
    const resourceData = await api_default.data.get(["resources", resourceId], {
      fields: ["id", "mime", "title", "file_extension"]
    });
    if (!resourceData) {
      return null;
    }
    return new _Resource({
      tmpdir: tmpdir2,
      resourceId: resourceData.id,
      mime: resourceData.mime ?? mimeType,
      title: resourceData.title,
      fileExt: resourceData.file_extension || fileExt,
      // The resource was loaded through Joplin, and thus has no assoicated tempfile.
      tempfilePath: void 0
    });
  }
  static async ofData(tmpdir2, data, title, fileExtension) {
    const query = null;
    const metadata = {
      title: title.endsWith(fileExtension) ? title : `${title}${fileExtension}`,
      created_time: Date.now(),
      updated_time: Date.now(),
      file_extension: fileExtension
    };
    const filePath = await tmpdir2.newFile(data, fileExtension);
    const fileData = [{ path: filePath }];
    const result = await api_default.data.post(["resources"], query, metadata, fileData);
    const resource = new _Resource({
      tmpdir: tmpdir2,
      resourceId: result.id,
      mime: result.mime,
      title: result.title,
      fileExt: fileExtension
    });
    return resource;
  }
};
var Resource_default = Resource;

// src/DrawingManager.ts
var insertText = async (textToInsert) => {
  await api_default.commands.execute("insertText", textToInsert);
};
var DrawingManager = class {
  constructor(temporaryDirectory_, dialogFactory_, updateDialogSettings_) {
    this.temporaryDirectory_ = temporaryDirectory_;
    this.dialogFactory_ = dialogFactory_;
    this.updateDialogSettings_ = updateDialogSettings_;
  }
  allDialogs_ = [];
  getClosedDialog_() {
    for (const view of this.allDialogs_) {
      if (!view.isOpen()) {
        return view;
      }
    }
    const newView = this.dialogFactory_();
    this.allDialogs_.push(newView);
    return newView;
  }
  async insertNewDrawing(svgData) {
    const resource = await Resource_default.ofData(
      this.temporaryDirectory_,
      svgData,
      localization_default.defaultImageTitle,
      ".svg"
    );
    const textToInsert = `![${resource.htmlSafeTitle()}](:/${resource.resourceId})`;
    await insertText(textToInsert);
    return resource;
  }
  async editDrawing(resourceUrl, { allowSaveAsCopy = true }) {
    const expectedMime = "image/svg+xml";
    const originalResource = await Resource_default.fromURL(
      this.temporaryDirectory_,
      resourceUrl,
      ".svg",
      expectedMime
    );
    if (!originalResource) {
      throw new Error("Invalid resource URL!");
    }
    if (originalResource.mime !== expectedMime) {
      void api_default.views.dialogs.showMessageBox(
        localization_default.notAnEditableImage(resourceUrl, originalResource.mime)
      );
      return null;
    }
    let resource = originalResource;
    const saveAsNewCallback = async (data) => {
      console.log("Image editor: Inserting new drawing...");
      resource = await this.insertNewDrawing(data);
    };
    const dialog = this.getClosedDialog_();
    this.updateDialogSettings_(dialog);
    const saved = await dialog.promptForDrawing({
      initialData: await resource.getDataAsString(),
      saveCallbacks: {
        overwrite: async (data) => {
          console.log("Image editor: Overwriting resource...");
          await resource.updateData(data);
        },
        saveAsNew: allowSaveAsCopy ? saveAsNewCallback : null
      }
    });
    return saved ? resource : null;
  }
  async editOrInsertDrawing() {
    const selection = await api_default.commands.execute("selectedText");
    if (selection && (/^:\/[a-zA-Z0-9]+$/.exec(selection) || /^[a-z0-9]{32}$/.exec(selection))) {
      console.log("Attempting to edit selected resource,", selection);
      await this.editDrawing(selection, { allowSaveAsCopy: false });
    } else {
      const dialog = this.getClosedDialog_();
      this.updateDialogSettings_(dialog);
      let savedResource = null;
      await dialog.promptForDrawing({
        initialData: void 0,
        saveCallbacks: {
          saveAsNew: async (svgData) => {
            savedResource = await this.insertNewDrawing(svgData);
          },
          overwrite: async (svgData) => {
            if (!savedResource) {
              throw new Error("A new drawing must be saved once before it can be overwritten");
            }
            await savedResource.updateData(svgData);
          }
        },
        // Save as new without a prompt (can't overwrite at first)
        initialSaveMethod: "saveAsNew" /* SaveAsNew */
      });
    }
  }
};

// src/index.ts
api_default.plugins.register({
  onStart: async function() {
    setLocale(await api_default.settings.globalValue("locale"));
    const tmpdir2 = await TemporaryDirectory.create();
    const settings = await registerSettings();
    const dialogManager = new DrawingManager(
      tmpdir2,
      () => DrawingDialog.create(tmpdir2),
      settings.applySettingsTo
    );
    const drawingWindowManager = new DrawingManager(
      tmpdir2,
      () => new DrawingWindow(tmpdir2),
      settings.applySettingsTo
    );
    const editInSameWindowCommand = `${pluginPrefix}insertDrawing`;
    await api_default.commands.register({
      name: editInSameWindowCommand,
      label: localization_default.insertDrawing,
      enabledCondition: "oneNoteSelected && !noteIsReadOnly",
      iconName: "fas fa-pen-alt",
      execute: async () => {
        await dialogManager.editOrInsertDrawing();
      }
    });
    const editInNewWindowCommand = `${pluginPrefix}insertDrawing__newWindow`;
    await api_default.commands.register({
      name: editInNewWindowCommand,
      label: localization_default.insertDrawingInNewWindow,
      iconName: "fas fa-pen-alt",
      execute: async () => {
        await drawingWindowManager.editOrInsertDrawing();
      }
    });
    await api_default.views.toolbarButtons.create(
      editInSameWindowCommand,
      editInSameWindowCommand,
      "editorToolbar" /* EditorToolbar */
    );
    const toolMenuInsertDrawingButtonId = `${pluginPrefix}insertDrawingToolMenuBtn`;
    await api_default.views.menuItems.create(
      toolMenuInsertDrawingButtonId,
      editInSameWindowCommand,
      "edit" /* Edit */
    );
    const restoreAutosaveCommand = `${pluginPrefix}restoreAutosave`;
    const deleteAutosaveCommand = `${pluginPrefix}deleteAutosave`;
    await api_default.commands.register({
      name: restoreAutosaveCommand,
      label: localization_default.restoreFromAutosave,
      iconName: "fas fa-floppy-disk",
      execute: async () => {
        const svgData = await getAutosave();
        if (!svgData) {
          await api_default.views.dialogs.showMessageBox(localization_default.noSuchAutosaveExists);
          return;
        }
        await dialogManager.insertNewDrawing(svgData);
      }
    });
    await api_default.commands.register({
      name: deleteAutosaveCommand,
      label: localization_default.deleteAutosave,
      iconName: "fas fa-trash-can",
      execute: async () => {
        await clearAutosave();
      }
    });
    await api_default.contentScripts.register(
      "markdownItPlugin" /* MarkdownItPlugin */,
      markdownItContentScriptId,
      "./contentScripts/markdownIt.cjs"
    );
    await api_default.contentScripts.onMessage(markdownItContentScriptId, async (action) => {
      if (action.startsWith("edit:")) {
        const resourceUrl = action.replace(/^edit:/, "");
        return (await dialogManager.editDrawing(resourceUrl, { allowSaveAsCopy: true }))?.resourceId;
      } else if (action === "get-locale:") {
        return getLocales();
      }
      console.warn("Unknown action", action);
      return null;
    });
  }
});
