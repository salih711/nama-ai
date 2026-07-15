import { Router, type IRouter } from "express";
import healthRouter from "./health";
import dashboardRouter from "./dashboard";
import aiAgentRouter from "./aiAgent";
import recommendationsRouter from "./recommendations";
import cardsRouter from "./cards";
import financingRouter from "./financing";
import investmentsRouter from "./investments";
import financialHealthRouter from "./financialHealth";
import reportsRouter from "./reports";

const router: IRouter = Router();

router.use(healthRouter);
router.use(dashboardRouter);
router.use(aiAgentRouter);
router.use(recommendationsRouter);
router.use(cardsRouter);
router.use(financingRouter);
router.use(investmentsRouter);
router.use(financialHealthRouter);
router.use(reportsRouter);

export default router;
