#include "pch.h"
#include "ChoiceInput.h"
#include "ChoiceSetInput.h"
#include "ParseUtil.h"

using namespace AdaptiveSharedNamespace;

ChoiceSetInput::ChoiceSetInput() : BaseInputElement(CardElementType::ChoiceSetInput)
{
    PopulateKnownPropertiesSet();
}

const std::vector<std::shared_ptr<ChoiceInput>>& ChoiceSetInput::GetChoices() const
{
    return m_choices;
}

std::vector<std::shared_ptr<ChoiceInput>>& ChoiceSetInput::GetChoices()
{
    return m_choices;
}

Json::Value ChoiceSetInput::SerializeToJsonValue() const
{
    Json::Value root = BaseInputElement::SerializeToJsonValue();

    root[AdaptiveCardSchemaKeyToString(AdaptiveCardSchemaKey::Style)] = ChoiceSetStyleToString(m_choiceSetStyle);

    if (m_isMultiSelect)
    {
        root[AdaptiveCardSchemaKeyToString(AdaptiveCardSchemaKey::IsMultiSelect)] = m_isMultiSelect;
    }

    if (!m_value.empty())
    {
        root[AdaptiveCardSchemaKeyToString(AdaptiveCardSchemaKey::Value)] = m_value;
    }

    std::string propertyName = AdaptiveCardSchemaKeyToString(AdaptiveCardSchemaKey::Choices);
    root[propertyName] = Json::Value(Json::arrayValue);
    for (const auto& choice : m_choices)
    {
        root[propertyName].append(choice->SerializeToJsonValue());
    }

    return root;
}

bool ChoiceSetInput::GetIsMultiSelect() const
{
    return m_isMultiSelect;
}

void ChoiceSetInput::SetIsMultiSelect(const bool isMultiSelect)
{
    m_isMultiSelect = isMultiSelect;
}

ChoiceSetStyle ChoiceSetInput::GetChoiceSetStyle() const
{
    return m_choiceSetStyle;
}

void ChoiceSetInput::SetChoiceSetStyle(const ChoiceSetStyle choiceSetStyle)
{
    m_choiceSetStyle = choiceSetStyle;
}

std::string ChoiceSetInput::GetValue() const
{
    return m_value;
}

void ChoiceSetInput::SetValue(std::string const &value)
{
    m_value = value;
}

std::shared_ptr<BaseCardElement> ChoiceSetInputParser::Deserialize(
    std::shared_ptr<ElementParserRegistration> elementParserRegistration,
    std::shared_ptr<ActionParserRegistration> actionParserRegistration,
    const Json::Value& json)
{
    ParseUtil::ExpectTypeString(json, CardElementType::ChoiceSetInput);

    auto choiceSet = BaseInputElement::Deserialize<ChoiceSetInput>(json);

    choiceSet->SetChoiceSetStyle(ParseUtil::GetEnumValue<ChoiceSetStyle>(json, AdaptiveCardSchemaKey::Style, ChoiceSetStyle::Compact, ChoiceSetStyleFromString));
    choiceSet->SetIsMultiSelect(ParseUtil::GetBool(json, AdaptiveCardSchemaKey::IsMultiSelect, false));
    choiceSet->SetValue(ParseUtil::GetString(json, AdaptiveCardSchemaKey::Value, false));

    // Parse Choices
    auto choices = ParseUtil::GetElementCollectionOfSingleType<ChoiceInput>(elementParserRegistration, actionParserRegistration, json, AdaptiveCardSchemaKey::Choices, ChoiceInput::Deserialize, true);
    choiceSet->m_choices = std::move(choices);

    return choiceSet;
}

std::shared_ptr<BaseCardElement> ChoiceSetInputParser::DeserializeFromString(
    std::shared_ptr<ElementParserRegistration> elementParserRegistration,
    std::shared_ptr<ActionParserRegistration> actionParserRegistration,
    const std::string& jsonString)
{
    return ChoiceSetInputParser::Deserialize(elementParserRegistration, actionParserRegistration, ParseUtil::GetJsonValueFromString(jsonString));
}

void ChoiceSetInput::PopulateKnownPropertiesSet() 
{
    m_knownProperties.insert(AdaptiveCardSchemaKeyToString(AdaptiveCardSchemaKey::Choices));
    m_knownProperties.insert(AdaptiveCardSchemaKeyToString(AdaptiveCardSchemaKey::IsMultiSelect));
    m_knownProperties.insert(AdaptiveCardSchemaKeyToString(AdaptiveCardSchemaKey::Style));
    m_knownProperties.insert(AdaptiveCardSchemaKeyToString(AdaptiveCardSchemaKey::Value));
}
