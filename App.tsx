import { Background } from "./src/components/Background";
import { Providers } from "./src/providers";
import { Routes } from "./src/routes";

export default function App() {
  return (
    <Providers>
      <Background>
        <Routes />
      </Background>
    </Providers>
  );
}
