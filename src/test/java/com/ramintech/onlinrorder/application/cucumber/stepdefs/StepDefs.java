package com.ramintech.onlinrorder.application.cucumber.stepdefs;

import com.ramintech.onlinrorder.application.OnlinrOrderApplicationApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = OnlinrOrderApplicationApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
