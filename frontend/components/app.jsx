/* global React, ReactDOM, Nav, Hero, StatsBar, HowItWorks, Differentials, Testimonials, LiveSales, Comparativo, FAQ, Partners, Blog, Footer, SimulatorNav, StepShell, BrandStep, ModelStep, YearStep, VersionStep, DetailsStep, AnalyzingStep, Summary, OfferReveal, Success, FIPE */

const initialData = () => ({
  mode: null,      // 'placa' | 'manual'
  plate: '',
  brand: '',
  model: '',
  year: '',
  version: '',
  km: 60000,
  condition: 'bom',
  scheduled: null,  // {date, slot}
});

function AmperApp() {
  // Screens: 'landing' | 'simulator' | 'analyzing' | 'offer' | 'success'
  const [screen, setScreen] = React.useState('landing');
  // Simulator step 1..5 (brand, model, year, version, details)
  const [step, setStep] = React.useState(1);
  const [data, setData] = React.useState(initialData);
  const [offerValue, setOfferValue] = React.useState(0);
  // Dados reais da oferta vindos do backend (null = usar mock)
  const [apiOffer, setApiOffer] = React.useState(null);
  // plate→manual transition: hint banner
  const [plateHint, setPlateHint] = React.useState(false);

  const handleStart = (payload = {}) => {
    setData(d => ({ ...initialData(), ...payload }));
    setApiOffer(null);
    if (payload.mode === 'placa') {
      // Fluxo placa: pula direto para o passo 5 (km + condição).
      // A resolução do veículo acontece quando o usuário clica em "Ver minha oferta".
      setPlateHint(false);
      setStep(5);
    } else if (payload.mode === 'manual' && payload.brand && payload.model && payload.year) {
      setPlateHint(false);
      setStep(4); // skip to version
    } else {
      setPlateHint(false);
      setStep(1);
    }
    setScreen('simulator');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleStartFromCta = () => {
    setData(initialData());
    setPlateHint(false);
    setStep(1);
    setScreen('simulator');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const goToOffer = async () => {
    setScreen('analyzing');
    window.scrollTo({ top: 0, behavior: 'instant' });

    if (data.mode === 'placa') {
      // Fluxo placa: chama o backend durante a tela de "analisando".
      try {
        const result = await window.AmperAPI.avaliarPlaca({
          placa:    data.plate,
          km:       data.km,
          condicao: data.condition,
        });
        setApiOffer(result);
        // Atualiza data com as informações do veículo resolvidas pelo backend.
        if (result.veiculo) {
          setData(d => ({
            ...d,
            brand:   result.veiculo.marca,
            model:   result.veiculo.modelo,
            year:    result.veiculo.ano,
            version: result.veiculo.modeloFipe || result.veiculo.modelo,
          }));
        }
      } catch (e) {
        console.error('[goToOffer] Erro ao chamar backend:', e.message);
        // Não bloqueia: mostra a tela de oferta com mock se o backend falhar.
        setApiOffer(null);
      }
    } else {
      // Fluxo manual: só espera a animação de 4s (usa mock ou /api/preco-mercado).
      await new Promise(r => setTimeout(r, 4000));
    }

    setScreen('offer');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleAccept = (payload) => {
    // payload carries {date, slot, offer} from the inline scheduler
    setData(d => ({ ...d, scheduled: { date: payload.date, slot: payload.slot } }));
    setOfferValue(payload.offer);
    setScreen('success');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleReset = () => {
    setScreen('landing');
    setData(initialData());
    setApiOffer(null);
    setPlateHint(false);
    setStep(1);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Render by screen
  if (screen === 'landing') {
    return (
      <div data-screen-label="Landing">
        <Nav onStart={handleStartFromCta}/>
        <Hero onStart={handleStart}/>
        <StatsBar/>
        <HowItWorks onStart={handleStartFromCta}/>
        <Differentials/>
        <Testimonials/>
        <LiveSales/>
        <Comparativo/>
        <FAQ/>
        <Partners/>
        <Blog/>
        <Footer onStart={handleStartFromCta}/>
      </div>
    );
  }

  if (screen === 'simulator') {
    const totalSteps = 5;
    const update = (patch) => setData(d => ({ ...d, ...patch }));
    // auto-advance helper: set field, then jump to next step
    const autoNext = (patch, nextStep) => {
      setData(d => ({ ...d, ...patch }));
      // small delay so user sees the selection highlight before step swap
      setTimeout(() => setStep(nextStep), 160);
    };

    let body = null, canNext = false, title = '', subtitle = '', showButtons = true, nextLabel = 'Continuar';

    if (step === 1) {
      title = 'Qual a marca do seu carro?';
      subtitle = plateHint
        ? `Não conseguimos decodificar a placa ${data.plate || ''} automaticamente. Selecione a marca para continuarmos.`
        : 'Começamos pela marca. Mais de 40 fabricantes disponíveis.';
      body = <BrandStep value={data.brand} onSelect={(v) => autoNext({ brand: v, model: '' }, 2)}/>;
      showButtons = false; // auto-advance
    } else if (step === 2) {
      title = 'E o modelo?';
      subtitle = 'Selecione o modelo específico do seu veículo.';
      body = <ModelStep brand={data.brand} value={data.model} onSelect={(v) => autoNext({ model: v }, 3)}/>;
      showButtons = false;
    } else if (step === 3) {
      title = 'Ano do veículo?';
      subtitle = 'Informe o ano de fabricação.';
      body = <YearStep value={data.year} onSelect={(v) => autoNext({ year: v }, 4)}/>;
      showButtons = false;
    } else if (step === 4) {
      title = 'Qual a versão?';
      subtitle = 'A versão influencia direto no valor final.';
      body = <VersionStep brand={data.brand} model={data.model} value={data.version} onSelect={(v) => autoNext({ version: v }, 5)}/>;
      showButtons = false;
    } else if (step === 5) {
      if (data.mode === 'placa') {
        title = 'Quilometragem e estado';
        subtitle = `Placa ${data.plate} identificada. Informe a quilometragem e condição para calcular sua oferta.`;
      } else {
        title = 'Quilometragem e estado';
        subtitle = 'Quase lá. Essas informações afinam a avaliação.';
      }
      body = <DetailsStep km={data.km} setKm={(v) => update({ km: v })} condition={data.condition} setCondition={(v) => update({ condition: v })}/>;
      canNext = true;
      nextLabel = 'Ver minha oferta';
      showButtons = true;
    }

    return (
      <div data-screen-label={`Simulator-${step}`} style={{ minHeight: '100vh', background: 'var(--surface)' }}>
        <SimulatorNav
          onExit={handleReset}
          step={step}
          totalSteps={totalSteps}
          completedSteps={{
            // No fluxo placa, marca/modelo/ano são resolvidos automaticamente.
            // Marca os 4 primeiros como concluídos para o indicador de progresso ficar limpo.
            1: data.mode === 'placa' || !!data.brand,
            2: data.mode === 'placa' || !!data.model,
            3: data.mode === 'placa' || !!data.year,
            4: data.mode === 'placa' || !!data.version,
            5: false,
          }}
          onStepClick={(n) => {
            // No modo placa, os passos 1-4 foram resolvidos automaticamente —
            // não permitir navegação manual para eles.
            if (data.mode === 'placa') return;
            const canGo =
              n === 1 ||
              (n === 2 && data.brand) ||
              (n === 3 && data.brand && data.model) ||
              (n === 4 && data.brand && data.model && data.year) ||
              (n === 5 && data.brand && data.model && data.year && data.version);
            if (canGo) setStep(n);
          }}
        />
        <StepShell
          title={title}
          subtitle={subtitle}
          onBack={step > 1 ? () => setStep(step - 1) : null}
          onNext={showButtons ? goToOffer : null}
          nextLabel={nextLabel}
          nextDisabled={!canNext}
          aside={<Summary {...data}/>}
        >
          {body}
        </StepShell>
      </div>
    );
  }

  if (screen === 'analyzing') {
    return (
      <div data-screen-label="Analyzing" style={{ minHeight: '100vh', background: 'var(--surface)' }}>
        <SimulatorNav onExit={handleReset} step={5} totalSteps={5}/>
        <AnalyzingStep/>
      </div>
    );
  }

  if (screen === 'offer') {
    return (
      <div data-screen-label="Offer" style={{ minHeight: '100vh', background: 'var(--surface)' }}>
        <SimulatorNav onExit={handleReset} step={5} totalSteps={5}/>
        <OfferReveal
          data={data}
          apiOffer={apiOffer}
          onAccept={handleAccept}
          onReject={() => setScreen('simulator')}
        />
      </div>
    );
  }

  if (screen === 'success') {
    const offer = offerValue || window.amperOffer(window.estimatePrice(data));
    return (
      <div data-screen-label="Success" style={{ minHeight: '100vh', background: 'var(--surface)' }}>
        <SimulatorNav onExit={handleReset} step={5} totalSteps={5}/>
        <Success data={data} offer={offer} onRestart={handleReset}/>
      </div>
    );
  }

  return null;
}

window.AmperApp = AmperApp;
