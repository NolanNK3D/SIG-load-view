'use client'
import { useEffect, useRef } from 'react'
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'

export default function LoadView() {
  const initRef = useRef(false)

  useEffect(() => {
    if (initRef.current) return
    initRef.current = true
    import('../lib/app-logic').then(({ initApp }) => initApp())
  }, [])

  return (
    <>

<!-- LOGIN -->
<div className="login" id="login">
  <div className="login-card">
    <div className="lg"><div className="logo">⚡</div><div><h2>LoadView</h2><small>par Load Stations · Jumeau numérique IRVE — v0.5</small></div></div>
    <div id="loginStep1">
      <div className="field"><label>Identifiant (e-mail)</label><input id="loginEmail" type="email" placeholder="votre@email.com"></div>
      <div className="field"><label>Mot de passe</label><input id="loginPwd" type="password" placeholder="••••••••••••"></div>
      <div id="loginErr" style={{display:'none',color:'var(--err)',fontSize:'12.5px',marginBottom:'8px',padding:'7px 10px',background:'#fee2e2',borderRadius:'7px'}}></div>
      <button className="btn" id="loginBtn">Se connecter</button>
      <span className="lnk" id="forgotLnk">Mot de passe oublié ?</span>
      <div style={{textAlign:'center',marginTop:'8px',fontSize:'12.5px',color:'var(--text-soft)'}}>Pas encore de compte ? <span className="lnk" id="signupLnk" style={{display:'inline',margin:0}}>Créer un compte</span></div>
    </div>
    <div id="loginStep4" style={{display:'none'}}>
      <p style={{fontSize:'13px',color:'var(--text-soft)',marginBottom:'14px'}}>Créez votre accès LoadView. Votre compte sera actif après confirmation par e-mail.</p>
      <div className="field"><label>Nom complet</label><input id="su_name" type="text" placeholder="Prénom Nom"></div>
      <div className="field"><label>Adresse e-mail</label><input id="su_email" type="email" placeholder="votre@email.com"></div>
      <div className="field"><label>Mot de passe</label><input id="su_pwd" type="password" placeholder="8 caractères minimum"></div>
      <div className="field"><label>Confirmer le mot de passe</label><input id="su_pwd2" type="password" placeholder="••••••••••••"></div>
      <div id="suMsg" style={{display:'none',fontSize:'12.5px',marginBottom:'8px',padding:'7px 10px',borderRadius:'7px'}}></div>
      <button className="btn" id="suBtn">Créer mon compte</button>
      <span className="lnk" id="backFromSignupLnk">← Retour à la connexion</span>
    </div>
    <div id="loginStep3" style={{display:'none'}}>
      <p style={{fontSize:'13px',color:'var(--text-soft)',marginBottom:'14px'}}>Saisissez votre adresse e-mail. Vous recevrez un lien pour réinitialiser votre mot de passe.</p>
      <div className="field"><label>Adresse e-mail</label><input id="resetEmail" type="email" placeholder="votre@email.com"></div>
      <div id="resetMsg" style={{display:'none',fontSize:'12.5px',marginBottom:'8px',padding:'7px 10px',borderRadius:'7px'}}></div>
      <button className="btn" id="resetBtn">Envoyer le lien</button>
      <span className="lnk" id="backToLoginLnk">← Retour à la connexion</span>
    </div>
    <div id="loginStep2" style={{display:'none'}}>
      <p style={{fontSize:'13px',color:'var(--text-soft)',marginBottom:'6px'}}>Saisissez le code à 6 chiffres envoyé sur votre application d'authentification.</p>
      <div className="mfa-boxes"><input value="2" maxlength="1" /><input value="6" maxlength="1" /><input value="0" maxlength="1" /><input value="4" maxlength="1" /><input value="8" maxlength="1" /><input value="1" maxlength="1"></div>
      <button className="btn" id="mfaBtn">Valider</button>
      <span className="lnk">Renvoyer le code</span>
    </div>
  </div>
</div>

<div className="app">
  <header className="topbar">
    <div className="brand"><div className="logo">⚡</div><div><b>LoadView</b><small>par Load Stations</small></div></div>
    <div className="tenant-select" title="Multi-tenant (EF-A3)"><span>🏢</span><select id="tenantSel"><option>Tous les réseaux</option></select></div>
    <div className="search-global"><span>🔎</span><input placeholder="Rechercher station, borne, ticket…"></div>
    <div className="tb-spacer"></div>
    <button className="bell" id="bell">🔔<span className="badge" id="bellBadge">0</span></button>
    <span className="role-badge" id="roleBadge" title="Rôle courant (RBAC)">Propriétaire</span>
    <div className="avatar" id="topAvatar">VA</div>
    <button className="btn ghost sm" id="btnLogout" style={{display:'none',gap:'5px'}}>⎋ Déconnexion</button>
    <div className="notif-pop" id="notifPop"></div>
  </header>

  <nav className="sidebar">
    <div className="nav-section">Exploitation</div>
    <button className="nav-item active" data-view="map"><span className="ico">🗺️</span> Cartographie SIG</button>
    <button className="nav-item" data-view="stations"><span className="ico">📋</span> Stations <span className="count" id="cntStationsNav">0</span></button>
    <button className="nav-item" data-view="ref"><span className="ico">🗂️</span> Référentiel <span className="count" id="cntStations">0</span></button>
    <button className="nav-item" data-view="ged"><span className="ico">📄</span> GED</button>
    <div className="nav-section">Maintenance</div>
    <button className="nav-item" data-view="gmao"><span className="ico">🎫</span> GMAO — Tickets <span className="count" id="cntTickets">0</span></button>
    <button className="nav-item" data-view="planning"><span className="ico">📆</span> Planning</button>
    <button className="nav-item" data-view="echeancier"><span className="ico">⏰</span> Échéancier <span className="count" id="cntEch">0</span></button>
    <button className="nav-item" data-view="tournee"><span className="ico">🧭</span> Tournées</button>
    <div className="nav-section">Pilotage</div>
    <button className="nav-item" data-view="kpi"><span className="ico">📊</span> KPI &amp; Statistiques</button>
    <div className="nav-section">Plateforme</div>
    <button className="nav-item" data-view="connect"><span className="ico">🔌</span> Connecteurs</button>
    <button className="nav-item" data-view="admin"><span className="ico">⚙️</span> Administration</button>
    <button className="nav-item" data-view="audit"><span className="ico">📜</span> Journal d'audit</button>
    <div className="sidebar-foot"><span className="dot"></span>Supervision OCPP · QualiCharge<br /><span style={{opacity:.7}}>Démonstrateur — données fictives</span></div>
  </nav>

  <main className="main" id="main">

    <!-- CARTE -->
    <section className="view active" id="view-map">
      <div className="map-wrap">
        <div className="map-col">
          <div className="filters">
            <input type="search" id="mapSearch" placeholder="Rechercher (nom, ville)…" />
            <div className="fl"><label className="muted">État</label><select id="fState"><option value="">Tous</option><option value="ok">Disponible</option><option value="warn">Occupée</option><option value="err">En défaut</option><option value="off">Hors service</option></select></div>
            <div className="fl"><label className="muted">Puissance</label><select id="fPow"><option value="">Toutes</option><option value="ac">AC ≤ 22 kW</option><option value="50">DC 50 kW</option><option value="150">DC ≥ 150 kW</option><option value="300">≥ 300 kW</option></select></div>
            <div className="fl"><label className="muted">Connecteur</label><select id="fConn"><option value="">Tous</option><option>Combo CCS</option><option>CHAdeMO</option><option>T2</option></select></div>
            <label className="fl muted" style={{userSelect:'none'}}><input type="checkbox" id="fAlarm" /> Alarme</label>
            <div className="fl"><label className="muted">Colorer par</label><select id="fColor"><option value="state">État temps réel</option><option value="type">Type AC/DC</option></select></div>
            <button className="btn ghost sm" id="btnAdv">⚙ Filtre avancé</button>

            <button className="btn ghost sm" id="fReset">Réinitialiser</button>
            <div className="tb-spacer" style={{flex:1}}></div>
            <div className="fl"><label className="muted">Groupe</label><select id="grpSel"><option value="">—</option></select><button className="btn ghost sm" id="grpSave" title="Enregistrer la sélection courante comme groupe de suivi">💾</button></div>
            <button className="btn sm" id="btnExport">⬇ Export</button>
          </div>
          <div className="map-stage" id="mapStage">
            <div id="lmap"></div>
            <button className="map-reset" id="resetView" title="Vue d'ensemble France">⌖ France entière</button>
            <div className="legend" id="legend"></div>
            <div className="mapnote">Fond IGN Géoplateforme / OSM (EF-C2) · clustering + escargot (EF-C3/C4)</div>
          </div>
        </div>
        <div className="list-col"><div className="list-head" id="listHead"></div><div id="stationList"></div></div>
      </div>
    </section>

    <!-- STATIONS -->
    <section className="view" id="view-stations">
      <div className="page-head"><h1>Stations <span id="stCount" style={{fontSize:'14px',fontWeight:600,background:'var(--accent-soft,#e8f5f3)',color:'var(--accent,#1a6b5a)',padding:'2px 10px',borderRadius:'10px',verticalAlign:'middle',marginLeft:'6px'}}>0</span></h1><p>Vue tableau — filtres partagés avec la Cartographie SIG</p></div>
      <div className="filters" style={{margin:'0 26px 4px',padding:'10px 14px',background:'var(--surface)',borderRadius:'8px',border:'1px solid var(--border)'}}>
        <input type="search" id="stSearch" placeholder="Rechercher (nom, ville, ID)…" style={{minWidth:'180px'}} />
        <div className="fl"><label className="muted">État</label><select id="stFState"><option value="">Tous</option><option value="ok">Disponible</option><option value="warn">Occupée</option><option value="err">En défaut</option><option value="off">Hors service</option></select></div>
        <div className="fl"><label className="muted">Puissance</label><select id="stFPow"><option value="">Toutes</option><option value="ac">AC ≤ 22 kW</option><option value="50">DC 50 kW</option><option value="150">DC ≥ 150 kW</option><option value="300">≥ 300 kW</option></select></div>
        <div className="fl"><label className="muted">Connecteur</label><select id="stFConn"><option value="">Tous</option><option>Combo CCS</option><option>CHAdeMO</option><option>T2</option></select></div>
        <label className="fl muted" style={{userSelect:'none'}}><input type="checkbox" id="stFAlarm" /> Alarme</label>
        <button className="btn ghost sm" id="stFReset">Réinitialiser</button>
      </div>
      <div className="card" style={{margin:'12px 26px 26px',overflow:'auto'}}>
        <table id="stationsTable">
          <thead><tr><th>État</th><th>ID</th><th>Nom</th><th>Ville</th><th>Réseau</th><th>Opérateur</th><th>Mainteneur</th><th style={{textAlign:'right'}}>PDC</th><th style={{textAlign:'right'}}>Puissance</th><th>Type</th><th style={{textAlign:'center'}}>Alarme</th></tr></thead>
          <tbody></tbody>
        </table>
      </div>
    </section>

    <!-- RÉFÉRENTIEL -->
    <section className="view" id="view-ref">
      <div className="page-head"><h1>Référentiel d'actifs</h1><p>Réseau → Station → Raccordement → Tableau → Protections → Bornes → Organes → PDC (EF-R1)</p></div>
      <div className="grid" style={{gridTemplateColumns:'360px 1fr'}}>
        <div className="card" style={{overflow:'hidden'}}><div className="list-head">Arborescence du parc</div><div className="tree" id="refTree" style={{maxHeight:'calc(100vh - 200px)',overflow:'auto'}}></div></div>
        <div className="card" style={{overflow:'hidden'}}><div id="refDetail" style={{padding:'22px'}}></div></div>
      </div>
    </section>

    <!-- GED -->
    <section className="view" id="view-ged">
      <div className="page-head"><h1>Gestion documentaire (GED)</h1><p>Deux axes — par réseau et par station — avec héritage (EF-R5/R6). Un document de niveau réseau est visible depuis toutes ses stations.</p></div>
      <div className="ged-wrap">
        <div className="card" style={{overflow:'hidden'}}><div className="list-head">Arborescence documentaire</div><div className="tree" id="gedTree" style={{maxHeight:'calc(100vh - 230px)',overflow:'auto'}}></div></div>
        <div className="card" style={{overflow:'hidden'}}><div className="list-head" id="gedHead">Documents</div><div id="gedList"></div></div>
      </div>
    </section>

    <!-- GMAO -->
    <section className="view" id="view-gmao">
      <div className="page-head"><h1>GMAO — Suivi des interventions</h1></div>
      <div className="helpbox"><span className="hi">🎫</span><div>Un <b>ticket</b> = une intervention à mener sur une borne (panne, dépannage ou maintenance). Le <b>SLA</b> est le délai contractuel à tenir : <b>GTI</b> = délai pour <i>prendre en charge</i>, <b>GTR</b> = délai pour <i>rétablir</i> le service. Cliquez un compteur ci-dessous pour filtrer, ou une ligne pour ouvrir le ticket.</div></div>
      <div className="grid cols-4" id="gmaoStats"></div>
      <div className="slalegend"><span>SLA :</span><span className="tag t-ok">respecté</span><span className="tag t-warn">en risque (échéance proche)</span><span className="tag t-err">dépassé</span><span style={{marginLeft:'10px'}}>Criticité (bord de ligne) :</span><span className="tag t-err">critique</span><span className="tag t-warn">majeur</span><span className="tag t-info">mineur</span></div>
      <div className="toolbar">
        <select id="gfStatut"><option value="">Tous statuts</option><option>nouveau</option><option>assigné</option><option>en cours</option><option>en attente</option><option>résolu</option><option>clôturé</option></select>
        <select id="gfType"><option value="">Tous types</option><option value="curatif">Curatif</option><option value="preventif">Préventif</option><option value="depannage">Dépannage</option></select>
        <select id="gfCrit"><option value="">Toute criticité</option><option value="critique">Critique</option><option value="majeur">Majeur</option><option value="mineur">Mineur</option></select>
        <select id="gfSla"><option value="">Tout SLA</option><option value="respecté">SLA respecté</option><option value="en risque">SLA en risque</option><option value="dépassé">SLA dépassé</option></select>
        <div className="tb-spacer"></div>
        <button className="btn ghost sm" id="gfSaved">★ Vue : dépassements GTR</button>
        <button className="btn" id="btnNewTk">＋ Nouveau ticket</button>
      </div>
      <div className="card" style={{margin:'0 26px 26px',overflow:'auto'}}>
        <table id="tkTable"><thead><tr><th>N°</th><th>Titre</th><th>Type</th><th>Criticité</th><th>Statut</th><th>Station / Équip.</th><th>Technicien</th><th>GTI</th><th>GTR</th><th>SLA</th></tr></thead><tbody></tbody></table>
      </div>
    </section>

    <!-- PLANNING -->
    <section className="view" id="view-planning">
      <div className="page-head"><h1>Planning / Agenda</h1><p>Interventions par technicien et par jour — semaine du 15 au 21 juin 2026 (EF-M6)</p></div>
      <div className="toolbar">
        <div className="seg"><button className="on">Semaine</button><button>Jour</button><button>Mois</button></div>
        <div className="tb-spacer"></div>
        <span className="chip"><span className="st-dot" style={{background:'var(--info)'}}></span>Préventif</span>
        <span className="chip"><span className="st-dot" style={{background:'var(--warn)'}}></span>Curatif</span>
        <span className="chip"><span className="st-dot" style={{background:'var(--err)'}}></span>Dépannage</span>
        <button className="btn sm" id="btnPlanNew">＋ Nouvelle intervention</button>
      </div>
      <div className="agenda card"><table id="agendaTable"></table></div>
    </section>

    <!-- ÉCHÉANCIER -->
    <section className="view" id="view-echeancier">
      <div className="page-head"><h1>Échéancier — maintenances à planifier</h1></div>
      <div className="helpbox"><span className="hi">⏰</span><div>Cette liste regroupe toutes les <b>maintenances obligatoires</b> à ne pas oublier : visites préventives et <b>contrôles réglementaires</b> (CONSUEL, vérification Q18). Elles sont triées de la plus <b>urgente</b> (en retard, en rouge) à la plus lointaine. Cliquez <b>« Planifier »</b> pour créer automatiquement l'intervention et l'affecter.</div></div>
      <div className="grid cols-3" id="echStats"></div>
      <div className="card" style={{margin:'0 26px 30px',overflow:'auto'}}>
        <table id="echTable"><thead><tr><th>Obligation</th><th>Station / Réseau</th><th>Type</th><th>Dernière réalisation</th><th>Échéance</th><th>Jours restants</th><th>Statut</th><th></th></tr></thead><tbody></tbody></table>
      </div>
    </section>

    <!-- TOURNÉES -->
    <section className="view" id="view-tournee">
      <div className="page-head"><h1>Préparer une tournée de maintenance</h1></div>
      <div className="helpbox"><span className="hi">🧭</span><div>Une <b>tournée</b>, c'est la liste des bornes à aller visiter le même jour, regroupées par <b>proximité géographique</b>. Indiquez un <b>point de départ</b>, une <b>distance maximale</b> et l'<b>échéance de maintenance</b> à traiter : LoadView liste les bornes concernées, trace le secteur sur la carte et peut créer les interventions en un clic.</div></div>
      <div className="steps">
        <div className="stepc"><span className="n">1</span><div><label>Point de départ</label><select id="tourCenter"></select></div></div>
        <span className="steparrow">→</span>
        <div className="stepc"><span className="n">2</span><div><label>Distance max</label><select id="tourRadius"><option>10</option><option selected>20</option><option>30</option><option>50</option></select></div><span className="muted">km</span></div>
        <span className="steparrow">→</span>
        <div className="stepc"><span className="n">3</span><div><label>Maintenance due sous</label><select id="tourWin"><option>15</option><option selected>30</option><option>60</option><option>90</option><option value="9999">peu importe</option></select></div><span className="muted">jours</span></div>
        <span className="steparrow">→</span>
        <button className="btn" id="tourPlan">＋ Créer les interventions</button>
      </div>
      <div className="recap" id="tourRecap"></div>
      <div className="grid cols-3" id="tourStats"></div>
      <div className="grid" style={{gridTemplateColumns:'0.95fr 1.05fr',alignItems:'start'}}>
        <div className="card" style={{overflow:'hidden'}}><div className="list-head">Secteur de la tournée</div><div id="tourMiniMap" style={{height:'420px'}}></div></div>
        <div className="card" style={{overflow:'auto',maxHeight:'470px'}}><div className="list-head">Bornes à visiter (ordre conseillé)</div><table id="tourTable"><thead><tr><th>#</th><th>Station</th><th>Distance</th><th>Échéance</th><th>Criticité</th><th>État</th></tr></thead><tbody></tbody></table></div>
      </div>
    </section>

    <!-- KPI -->
    <section className="view" id="view-kpi">
      <div className="page-head"><h1>KPI &amp; Statistiques</h1><p>Pilotage patrimoine, énergie et maintenance — filtres avancés (EF-K1 → EF-K6)</p></div>
      <div className="toolbar">
        <div className="seg" id="kpiScope"><button className="on" data-ks="net">Réseau</button><button data-ks="borne">Bornes</button><button data-ks="maint">Maintenance</button></div>
        <select id="kpiType"><option value="">AC + DC</option><option value="DC">DC</option><option value="AC">AC</option></select>
        <select id="kpiPeriod"><option>6 derniers mois</option><option>Mois en cours</option><option>12 mois glissants</option></select>
        <div className="tb-spacer"></div><span className="chip">🟢 Supervision (EF-D1)</span>
        <button className="btn ghost sm">⬇ Export Excel</button>
      </div>
      <div id="kpiNet">
        <div className="grid cols-4" id="kpiStats"></div>
        <div className="grid cols-2">
          <div className="card chart-card"><h3>Énergie délivrée</h3><div className="ch-sub">kWh/mois (EF-D3)</div><div id="chartEnergy"></div></div>
          <div className="card chart-card"><h3>Taux de disponibilité</h3><div className="ch-sub">% — cible 99,5 % (ENF-20)</div><div id="chartAvail"></div></div>
        </div>
        <div className="grid cols-3">
          <div className="card chart-card"><h3>États du parc</h3><div className="ch-sub">Temps réel</div><div id="chartStatus"></div></div>
          <div className="card chart-card"><h3>Énergie par type</h3><div className="ch-sub">AC / DC</div><div id="chartMix"></div></div>
          <div className="card chart-card"><h3>Vieillissement</h3><div className="ch-sub">Bornes par âge</div><div id="chartAge"></div></div>
        </div>
      </div>
      <div id="kpiBorne" style={{display:'none'}}>
        <div className="grid cols-4" id="borneStats" style={{gridTemplateColumns:'repeat(6,1fr)'}}></div>
        <div className="grid cols-2">
          <div className="card chart-card"><h3>Top énergie par borne</h3><div className="ch-sub">kWh / 6 mois</div><div id="chartBorneEnergy"></div></div>
          <div className="card chart-card"><h3>Taux d'utilisation</h3><div className="ch-sub">% — repère 25 %</div><div id="chartBorneUtil"></div></div>
        </div>
        <div className="grid cols-3">
          <div className="card chart-card"><h3>Énergie par connecteur</h3><div className="ch-sub">CCS / CHAdeMO / T2</div><div id="chartConn"></div></div>
          <div className="card chart-card"><h3>Disponibilité vs défauts</h3><div className="ch-sub">1 point = 1 borne</div><div id="chartReliab"></div></div>
          <div className="card chart-card"><h3>Énergie / session</h3><div className="ch-sub">kWh</div><div id="chartSession"></div></div>
        </div>
      </div>
      <div id="kpiMaint" style={{display:'none'}}>
        <div className="grid cols-4" id="maintStats" style={{gridTemplateColumns:'repeat(6,1fr)'}}></div>
        <div className="grid cols-2">
          <div className="card chart-card"><h3>Respect des SLA</h3><div className="ch-sub">% GTI / GTR par mois (EF-M15)</div><div id="chartSla"></div></div>
          <div className="card chart-card"><h3>Backlog de tickets</h3><div className="ch-sub">Tickets ouverts par mois</div><div id="chartBacklog"></div></div>
        </div>
        <div className="grid cols-2">
          <div className="card chart-card"><h3>Bornes les plus en panne</h3><div className="ch-sub">Nb tickets / 12 mois (EF-M16)</div><div id="chartTopFail"></div></div>
          <div className="card chart-card"><h3>Tickets par type &amp; criticité</h3><div className="ch-sub">Répartition</div><div id="chartTkMix"></div></div>
        </div>
      </div>
    </section>

    <!-- CONNECTEURS -->
    <section className="view" id="view-connect">
      <div className="page-head"><h1>Connecteurs</h1><p>Patron d'adaptateurs — supervision, GMAO tierce bidirectionnelle, QualiCharge, Enedis (ET-04)</p></div>
      <div className="grid cols-3" id="connectGrid"></div>
    </section>

    <!-- ADMIN -->
    <section className="view" id="view-admin">
      <div className="page-head"><h1>Administration</h1><p>Tenants, utilisateurs, profils mainteneur et matrice des droits (RBAC §2.3)</p></div>
      <div className="grid cols-2" style={{alignItems:'start'}}>
        <div className="card" style={{overflow:'hidden'}}><div className="list-head">Tenants (Super-administrateur)</div><table id="tenantTable"><thead><tr><th>Tenant</th><th>Volume</th><th>Stations</th><th>Utilisateurs</th><th>Statut</th></tr></thead><tbody></tbody></table></div>
        <div className="card" style={{overflow:'hidden'}}><div className="list-head" style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>Utilisateurs du tenant<button className="btn sm" id="btnAddUser">＋ Ajouter</button></div><table id="userTable"><thead><tr><th>Utilisateur</th><th>Rôle</th><th>Réseaux</th><th>Maintenance</th><th></th></tr></thead><tbody></tbody></table></div>
      </div>
      <div className="page-head" style={{paddingTop:'6px'}}><h1 style={{fontSize:'16px'}}>Profils mainteneur (EF-M1)</h1></div>
      <div className="card" style={{margin:'12px 26px',overflow:'auto'}}><table id="techTable"><thead><tr><th>Mainteneur / Technicien</th><th>Type</th><th>Compétences</th><th>Habilitations</th><th>Zone</th><th>Charge</th></tr></thead><tbody></tbody></table></div>
      <div className="page-head" style={{paddingTop:'6px'}}><h1 style={{fontSize:'16px'}}>Règles d'alarme paramétrables</h1><p style={{fontSize:'12.5px'}}>Déclencheurs configurables sur un large spectre de critères (remarque GC)</p></div>
      <div className="toolbar" style={{paddingTop:'6px'}}><div className="tb-spacer"></div><button className="btn sm" id="btnAlarmRule">＋ Nouvelle règle</button></div>
      <div className="card" style={{margin:'0 26px',overflow:'auto'}}><table id="alarmTable"><thead><tr><th>Critère</th><th>Opérateur</th><th>Seuil</th><th>Sévérité</th><th>Action automatique</th><th>Actif</th></tr></thead><tbody></tbody></table></div>
      <div className="page-head" style={{paddingTop:'14px'}}><h1 style={{fontSize:'16px'}}>Matrice des droits (RBAC)</h1></div>
      <div className="card" style={{margin:'12px 26px 30px',overflow:'auto'}}><table className="rbac" id="rbacTable"></table></div>
    </section>

    <!-- AUDIT -->
    <section className="view" id="view-audit">
      <div className="page-head"><h1>Journal d'audit (EF-A6)</h1><p>Historique horodaté des actions sensibles — consultable par les administrateurs (ES-05)</p></div>
      <div className="card" style={{margin:'18px 26px',overflow:'auto'}}><table id="auditTable"><thead><tr><th>Horodatage</th><th>Utilisateur</th><th>Action</th><th>Objet</th><th>IP</th></tr></thead><tbody></tbody></table></div>
    </section>
  </main>
</div>

<!-- STATION DRAWER -->
<aside className="drawer" id="drawer">
  <div className="drawer-head">
    <button className="close" id="drawerClose">✕</button>
    <div style={{display:'flex',alignItems:'center',gap:'9px'}}><span className="st-dot" id="dStatusDot" style={{width:'12px',height:'12px'}}></span><h2 id="dName" style={{fontSize:'17px'}}></h2></div>
    <div className="muted" id="dAddr" style={{fontSize:'12.5px',marginTop:'3px'}}></div>
    <div style={{marginTop:'9px',display:'flex',gap:'6px',flexWrap:'wrap'}} id="dTags"></div>
  </div>
  <div className="dtabs">
    <button className="dtab active" data-dt="info">Synthèse</button>
    <button className="dtab" data-dt="assets">Actifs</button>
    <button className="dtab" data-dt="gmao">GMAO</button>
    <button className="dtab" data-dt="dyn">Temps réel</button>
    <button className="dtab" data-dt="hist">Historique</button>
  </div>
  <div className="drawer-body" id="drawerBody"></div>
</aside>

<div className="overlay" id="overlay"><div className="modal" id="modal"></div></div>
<div className="toast" id="toast"></div>

    </>
  )
}
